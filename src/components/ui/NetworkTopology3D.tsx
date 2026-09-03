import { useEffect, useRef } from 'react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export const NetworkTopology3D = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isMobile = width < 768;
    const NODE_COUNT = isMobile ? 24 : 45;
    const MAX_DIST_3D = isMobile ? 140 : 180;
    const FOV = 350;

    const nodes: Node3D[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 0.8,
        y: (Math.random() - 0.5) * height * 0.8,
        z: (Math.random() - 0.5) * 300,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
      });
    }

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / width - 0.5;
      const normY = (e.clientY - rect.top) / height - 0.5;
      targetRotY = normX * 0.4;
      targetRotX = -normY * 0.4;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = nodes.map((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        const boundX = (width * 0.8) / 2;
        const boundY = (height * 0.8) / 2;
        const boundZ = 160;

        if (Math.abs(node.x) > boundX) node.vx *= -1;
        if (Math.abs(node.y) > boundY) node.vy *= -1;
        if (Math.abs(node.z) > boundZ) node.vz *= -1;

        // 3D rotation
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const scale = FOV / (FOV + z2 + 100);
        const px = x1 * scale + width / 2;
        const py = y1 * scale + height / 2;

        return { px, py, scale, z: z2 };
      });

      // Draw lines between close nodes
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST_3D) {
            const alpha = (1 - dist / MAX_DIST_3D) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14, 116, 144, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const radius = Math.max(1.2, 2.5 * p.scale);
        const alpha = Math.min(1, Math.max(0.2, 0.4 + (p.z / 300) * 0.4));

        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 116, 144, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 dark:opacity-40"
    />
  );
};

export default NetworkTopology3D;
