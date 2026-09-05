export const Marquee = () => {
  const items = [
    'MikroTik',
    'ESP8266',
    'Arduino IDE',
    'FTTH / Fiber Optic',
    'LAN Networking',
    'Cisco Packet Tracer',
    'Data Entry',
    'IoT Sensors',
    'DHT11 & Relay',
    'Routing & Switching',
    'TCP/IP & Subnetting',
    'Hardware Assembly',
  ];

  return (
    <div
      aria-hidden="true"
      className="relative z-20 w-full overflow-hidden border-y border-foreground/10 bg-background/50 py-5 select-none"
    >
      <div className="animate-marquee flex items-center">
        {/* Double array for seamless loop */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span className="font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.16em] text-foreground/85 whitespace-nowrap">
              {item}
            </span>
            <span className="text-foreground/30 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
