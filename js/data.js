/* Service listings used by the Services page.
   script.js builds the service cards from this array, then the search box
   and sort menu filter and reorder them. To add a service, add one more
   object here. No HTML changes are needed. */
window.SPARKY_SERVICES = [
    {
        id: 'installation',
        title: 'Electrical Installations',
        category: 'installation',
        from: 1200,
        image: 'images/service-installation.jpg',
        alt: 'Electrician installing wiring in a home',
        text: 'From new plug points and lighting circuits to full house rewires, we handle installations for both new builds and renovations, all completed to SANS 10142 wiring standards.'
    },
    {
        id: 'repair',
        title: 'Repairs and Fault Finding',
        category: 'repair',
        from: 650,
        image: 'images/service-repair.jpg',
        alt: 'Electrician diagnosing an electrical fault',
        text: 'Tripping breakers, faulty plug points, or flickering lights? We diagnose and fix electrical faults quickly and safely, with same-day call-outs available for urgent issues.'
    },
    {
        id: 'coc',
        title: 'Certificate of Compliance (COC) Inspections',
        category: 'coc',
        from: 1450,
        image: 'images/service-coc.jpg',
        alt: 'Electrician conducting a compliance inspection',
        text: 'Selling your property or renewing insurance? We conduct full electrical compliance inspections and issue a valid Certificate of Compliance in line with South African regulations.'
    },
    {
        id: 'lighting',
        title: 'Lighting and LED Upgrades',
        category: 'installation',
        from: 900,
        icon: '💡',
        text: 'Swap old fittings for energy-saving LED lighting, add downlights, or set up outdoor security lighting. A good way to bring your electricity bill down.'
    },
    {
        id: 'backup',
        title: 'Backup Power and Inverter Wiring',
        category: 'installation',
        from: 2500,
        icon: '🔋',
        text: 'Load shedding getting you down? We wire inverters and backup batteries into your distribution board so your lights, Wi-Fi and fridge stay on.'
    },
    {
        id: 'dbboard',
        title: 'Distribution Board Upgrades and Surge Protection',
        category: 'repair',
        from: 1800,
        icon: '⚡',
        text: 'Old fuse boxes are a fire risk. We replace them with modern trip-switch boards and fit surge protection to keep your appliances safe.'
    }
];
