export const events = [
  {
    id: 1,
    name: "Festival Internacional de Música",
    description:
      "El evento musical más grande del año con artistas internacionales y bandas emergentes en múltiples escenarios.",
    longDescription: `
        <p>Únete a nosotros para la experiencia musical definitiva del año. El Festival Internacional de Música reúne a más de 50 artistas de 20 países diferentes en un fin de semana inolvidable.</p>
        
        <p>Contaremos con 5 escenarios diferentes, cada uno dedicado a un género musical distinto:</p>
        <ul>
          <li>Escenario Principal: Grandes estrellas internacionales</li>
          <li>Escenario Alternativo: Rock independiente y música alternativa</li>
          <li>Zona Electrónica: DJs y música electrónica</li>
          <li>Espacio Acústico: Sesiones íntimas y acústicas</li>
          <li>Escenario Emergente: Nuevos talentos locales e internacionales</li>
        </ul>
        
        <p>Además de la música, disfrutarás de una amplia oferta gastronómica con food trucks de cocina internacional, zonas de descanso, mercadillo de artesanía y actividades paralelas como talleres de percusión, yoga y arte.</p>
      `,
    date: "24-26 Jun 2023",
    time: "18:00 - 03:00",
    location: "Plaza de la Revolución, La Habana",
    fullAddress: "Plaza de la Revolución, Vedado, La Habana, Cuba",
    image: "/images/events/music-festival.jpg",
    gallery: [
      "/images/events/music-festival-1.jpg",
      "/images/events/music-festival-2.jpg",
      "/images/events/music-festival-3.jpg",
    ],
    categories: ["Música", "Festival"],
    state: "Destacado",
    organizer: "Casa de la Música",
    attendees: 850,
    capacity: 2000,
    ticketTypes: [
      { name: "Entrada General", price: 45, available: true },
      { name: "Entrada VIP", price: 120, available: true },
      { name: "Abono 3 días", price: 110, available: true },
      { name: "Abono 3 días VIP", price: 280, available: false },
    ],
    faqs: [
      {
        question: "¿Hay zona de camping?",
        answer:
          "Sí, disponemos de zona de camping con duchas, baños y seguridad 24h. El pase de camping se compra por separado.",
      },
      {
        question: "¿Se pueden llevar alimentos y bebidas?",
        answer:
          "No se permite la entrada de alimentos ni bebidas al recinto. Dentro encontrarás una amplia oferta gastronómica.",
      },
      {
        question: "¿Hay límite de edad para asistir?",
        answer:
          "Los menores de 16 años deben ir acompañados de un adulto. Los menores de 10 años tienen entrada gratuita.",
      },
    ],
  },
  {
    id: 2,
    name: "Conferencia de Tecnología e Innovación",
    description:
      "Ponentes de las empresas tecnológicas más importantes compartirán las últimas tendencias.",
    longDescription: `
        <p>La Conferencia de Tecnología e Innovación es el punto de encuentro para profesionales, entusiastas y emprendedores del sector tecnológico. Durante tres días intensos, los asistentes podrán acceder a conferencias, talleres y networking con los líderes de la industria.</p>
        
        <p>El programa incluye:</p>
        <ul>
          <li>Keynotes de CEOs de empresas tecnológicas líderes</li>
          <li>Paneles de discusión sobre inteligencia artificial, blockchain y realidad virtual</li>
          <li>Talleres prácticos de programación y diseño</li>
          <li>Zona de exposición con las últimas novedades tecnológicas</li>
          <li>Sesiones de networking y reclutamiento</li>
        </ul>
        
        <p>Este año contamos con ponentes de Google, Microsoft, Amazon, Meta y numerosas startups innovadoras que compartirán su visión sobre el futuro de la tecnología y las oportunidades emergentes en el sector.</p>
      `,
    date: "15-17 Jul 2023",
    time: "09:00 - 19:00",
    location: "Palacio de Convenciones, La Habana",
    fullAddress: "Calle 146 e/ 11 y 13, Playa, La Habana, Cuba",
    image: "/images/events/tech-conference.jpeg",
    gallery: [
      "/images/events/tech-conference-1.jpg",
      "/images/events/tech-conference-2.jpg",
      "/images/events/tech-conference-3.jpg",
    ],
    categories: ["Tecnología", "Conferencia"],
    state: "Próximamente",
    organizer: "Instituto Cubano de la Música",
    attendees: 450,
    capacity: 1000,
    ticketTypes: [
      { name: "Pase Estándar", price: 75, available: true },
      { name: "Pase Premium", price: 150, available: true },
      { name: "Pase Estudiante", price: 35, available: true },
    ],
    faqs: [
      {
        question: "¿Las conferencias estarán en inglés o español?",
        answer:
          "Habrá traducción simultánea para todas las conferencias principales. Los talleres se impartirán en el idioma indicado en el programa.",
      },
      {
        question: "¿Se entregará certificado de asistencia?",
        answer:
          "Sí, todos los asistentes recibirán un certificado digital de participación.",
      },
      {
        question: "¿Habrá oportunidades de trabajo?",
        answer:
          "Contaremos con una zona de reclutamiento donde importantes empresas buscarán talento.",
      },
    ],
  },
  {
    id: 3,
    name: "Maratón Solidario",
    description:
      "Carrera benéfica para recaudar fondos para proyectos educativos en zonas desfavorecidas.",
    longDescription: `
        <p>El Maratón Solidario es una carrera benéfica cuyo objetivo principal es recaudar fondos para proyectos educativos en zonas desfavorecidas. Cada kilómetro recorrido se traduce en oportunidades para niños y jóvenes sin acceso a educación de calidad.</p>
        
        <p>El evento incluye diferentes modalidades para todos los niveles:</p>
        <ul>
          <li>Maratón completo: 42 km para los más experimentados</li>
          <li>Media maratón: 21 km para corredores habituales</li>
          <li>Carrera popular: 10 km abierta a todos los públicos</li>
          <li>Carrera familiar: 3 km para disfrutar con los más pequeños</li>
          <li>Caminata solidaria: 5 km sin necesidad de correr</li>
        </ul>
        
        <p>Además de la carrera, habrá actividades complementarias como talleres de estiramientos, stands informativos sobre los proyectos beneficiarios, música en vivo y una gran paella solidaria para reponer fuerzas al finalizar el evento.</p>
      `,
    date: "10 Ago 2023",
    time: "08:00 - 14:00",
    location: "Malecón Habanero, La Habana",
    fullAddress: "Malecón, Centro Habana, La Habana, Cuba",
    image: "/images/events/marathon.avif",
    gallery: [
      "/images/events/marathon-1.jpg",
      "/images/events/marathon-2.jpg",
      "/images/events/marathon-3.jpg",
    ],
    categories: ["Deporte", "Solidario"],
    state: "Abierta inscripción",
    organizer: "Fábrica de Arte Cubano (FAC)",
    attendees: 620,
    capacity: 1500,
    ticketTypes: [
      { name: "Inscripción Maratón", price: 30, available: true },
      { name: "Inscripción Media Maratón", price: 20, available: true },
      { name: "Inscripción Carrera Popular", price: 12, available: true },
      { name: "Inscripción Familiar", price: 25, available: true },
    ],
    faqs: [
      {
        question: "¿Dónde puedo recoger mi dorsal?",
        answer:
          "Los dorsales se pueden recoger el día anterior al evento de 10:00 a 20:00 en el Centro Comercial Aqua, o el mismo día de la carrera hasta 30 minutos antes de la salida.",
      },
      {
        question: "¿Hay servicio de guardarropa?",
        answer:
          "Sí, habrá un servicio gratuito de guardarropa en la zona de salida/meta.",
      },
      {
        question: "¿Qué incluye la inscripción?",
        answer:
          "La inscripción incluye camiseta técnica, dorsal con chip, avituallamientos en ruta, medalla finisher, seguro de accidentes y acceso a la paella solidaria.",
      },
    ],
  },
  {
    id: 4,
    name: "Exposición de Arte Contemporáneo",
    description:
      "Muestra de arte con obras de artistas nacionales e internacionales, con instalaciones interactivas.",
    longDescription: `
        <p>La Exposición de Arte Contemporáneo reúne las obras más vanguardistas de artistas nacionales e internacionales en una muestra que desafía los límites tradicionales del arte. Esta edición se centra en la interacción entre el espectador y la obra, con instalaciones que invitan al público a formar parte de la experiencia artística.</p>
        
        <p>La exposición está dividida en diferentes secciones:</p>
        <ul>
          <li>Arte digital y nuevos medios</li>
          <li>Instalaciones interactivas y participativas</li>
          <li>Pintura y escultura contemporánea</li>
          <li>Fotografía experimental</li>
          <li>Arte sonoro y performances programadas</li>
        </ul>
        
        <p>Entre los artistas destacados se encuentran nombres como Marina Abramović, Olafur Eliasson, Ai Weiwei y jóvenes talentos emergentes del panorama nacional. Cada obra ha sido cuidadosamente seleccionada para provocar reflexión y diálogo sobre temas actuales como la identidad, la tecnología y la sostenibilidad.</p>
      `,
    date: "5 Sep 2023",
    time: "10:00 - 20:00",
    location: "Museo Nacional de Bellas Artes, La Habana",
    fullAddress:
      "Calle Trocadero e/ Zulueta y Monserrate, Habana Vieja, La Habana, Cuba",
    image: "/images/events/art-exhibition.jpeg",
    gallery: [
      "/images/events/art-exhibition-1.jpg",
      "/images/events/art-exhibition-2.jpg",
      "/images/events/art-exhibition-3.jpg",
    ],
    categories: ["Arte", "Exposición"],
    state: "Destacado",
    organizer: "Universidad de La Habana",
    attendees: 480,
    capacity: 1200,
    ticketTypes: [
      { name: "Entrada General", price: 12, available: true },
      {
        name: "Entrada Reducida (Estudiantes/Jubilados)",
        price: 8,
        available: true,
      },
      { name: "Visita Guiada", price: 18, available: true },
      { name: "Abono Completo (incluye catálogo)", price: 25, available: true },
    ],
    faqs: [
      {
        question: "¿Hay visitas guiadas?",
        answer:
          "Sí, ofrecemos visitas guiadas todos los días a las 11:00, 13:00, 17:00 y 19:00. Es recomendable reservar con antelación.",
      },
      {
        question: "¿Se pueden tomar fotografías?",
        answer:
          "Se permite fotografiar la mayoría de las obras, excepto aquellas específicamente señaladas. No está permitido el uso de flash ni trípodes.",
      },
      {
        question: "¿Es adecuada para niños?",
        answer:
          "Sí, hay una sección especial con actividades interactivas para niños. Los fines de semana organizamos talleres infantiles gratuitos con la entrada.",
      },
    ],
  },
  {
    id: 5,
    name: "Festival Gastronómico",
    description:
      "Degustación de platos típicos de diferentes regiones y showcooking con chefs reconocidos.",
    longDescription: `
        <p>El Festival Gastronómico celebra la diversidad culinaria de España y el mundo entero. Durante tres días, los asistentes podrán disfrutar de una experiencia sensorial única que combina degustaciones, demostraciones de cocina en vivo y talleres participativos.</p>
        
        <p>El evento contará con:</p>
        <ul>
          <li>Más de 40 puestos de comida representando diferentes regiones y países</li>
          <li>Showcooking con chefs galardonados con estrellas Michelin</li>
          <li>Talleres de elaboración de tapas, paellas y postres tradicionales</li>
          <li>Catas guiadas de vinos, aceites y productos gourmet</li>
          <li>Concurso de cocina amateur con jurado profesional</li>
        </ul>
        
        <p>Entre los chefs invitados destacan figuras como Ferran Adrià, José Andrés, Dani García y Ángel León, quienes compartirán sus técnicas y filosofía culinaria con todos los asistentes.</p>
      `,
    date: "22-24 Sep 2023",
    time: "12:00 - 23:00",
    location: "Plaza Vieja, La Habana",
    fullAddress: "Plaza Vieja, Habana Vieja, La Habana, Cuba",
    image: "/images/events/food-festival.jpg",
    gallery: [
      "/images/events/food-festival-1.jpg",
      "/images/events/food-festival-2.jpg",
      "/images/events/food-festival-3.jpg",
    ],
    categories: ["Gastronomía", "Festival"],
    state: "Próximamente",
    organizer: "Asociación Culinaria de Cuba",
    attendees: 580,
    capacity: 1500,
    ticketTypes: [
      { name: "Entrada General", price: 15, available: true },
      { name: "Entrada + 5 degustaciones", price: 30, available: true },
      {
        name: "Pase VIP con acceso a showcookings",
        price: 75,
        available: true,
      },
      { name: "Abono 3 días completo", price: 120, available: true },
    ],
    faqs: [
      {
        question: "¿Cuál es la política de cancelación?",
        answer:
          "Puedes solicitar un reembolso hasta 7 días antes del evento. Después de esa fecha, no se realizarán devoluciones pero podrás transferir tu entrada a otra persona.",
      },
      {
        question: "¿Hay opciones para personas con restricciones alimentarias?",
        answer:
          "Sí, cada puesto indicará claramente los alérgenos y habrá opciones vegetarianas, veganas, sin gluten y sin lactosa en todo el recinto.",
      },
      {
        question: "¿Se puede pagar en efectivo dentro del recinto?",
        answer:
          "Aunque recomendamos el pago con tarjeta o mediante la app del festival, habrá puntos de venta de tokens que podrás usar como moneda oficial del evento.",
      },
    ],
  },
  {
    id: 6,
    name: "Concierto Sinfónico",
    description:
      "La orquesta sinfónica interpreta obras clásicas de Beethoven, Mozart y compositores contemporáneos.",
    longDescription: `
        <p>La Orquesta Sinfónica Nacional presenta una velada inolvidable con las más grandes obras del repertorio clásico y contemporáneo. Bajo la batuta del maestro Ricardo Álvarez, los músicos interpretarán piezas que han marcado la historia de la música.</p>
        
        <p>El programa del concierto incluye:</p>
        <ul>
          <li>Sinfonía No. 5 en Do menor de Ludwig van Beethoven</li>
          <li>Concierto para piano No. 21 en Do mayor de Wolfgang Amadeus Mozart</li>
          <li>Intermedio</li>
          <li>"El Pájaro de Fuego" de Igor Stravinsky</li>
          <li>Estreno mundial de "Horizontes", obra del compositor español Carlos Martínez</li>
        </ul>
        
        <p>Contaremos con la participación especial del pianista japonés Hiroshi Yamamoto, ganador del Concurso Internacional de Piano Frédéric Chopin, quien interpretará el concierto para piano de Mozart.</p>
      `,
    date: "8 Oct 2023",
    time: "20:00 - 22:30",
    location: "Gran Teatro de La Habana, La Habana",
    fullAddress:
      "Paseo del Prado, esq a San Rafael, Habana Vieja, La Habana, Cuba",
    image: "/images/events/symphony.jpg",
    gallery: [
      "/images/events/symphony-1.jpg",
      "/images/events/symphony-2.jpg",
      "/images/events/symphony-3.jpg",
    ],
    categories: ["Música", "Concierto"],
    state: "Entradas disponibles",
    organizer: "Ballet Nacional de Cuba",
    attendees: 1200,
    capacity: 2300,
    ticketTypes: [
      { name: "Entrada General", price: 35, available: true },
      { name: "Entrada Premium (Platea)", price: 60, available: true },
      { name: "Palco VIP", price: 90, available: true },
      {
        name: "Entrada Reducida (Estudiantes/Jubilados)",
        price: 25,
        available: true,
      },
    ],
    faqs: [
      {
        question: "¿Cuál es la duración aproximada del concierto?",
        answer:
          "El concierto tendrá una duración aproximada de 2 horas y 30 minutos, incluyendo un intermedio de 20 minutos.",
      },
      {
        question: "¿Hay código de vestimenta?",
        answer:
          "No hay un código de vestimenta estricto, aunque se recomienda vestimenta formal o semi-formal por respeto a la ocasión.",
      },
      {
        question: "¿Se permite la entrada una vez iniciado el concierto?",
        answer:
          "Por respeto a los músicos y al resto del público, no se permitirá el acceso a la sala una vez iniciado el concierto hasta el intermedio.",
      },
    ],
  },
];

export const relatedEvents = [
  {
    id: 2,
    name: "Conferencia de Tecnología e Innovación",
    description:
      "Ponentes de las empresas tecnológicas más importantes compartirán las últimas tendencias.",
    longDescription: `
        <p>La Conferencia de Tecnología e Innovación es el punto de encuentro para profesionales, entusiastas y emprendedores del sector tecnológico. Durante tres días intensos, los asistentes podrán acceder a conferencias, talleres y networking con los líderes de la industria.</p>
        
        <p>El programa incluye:</p>
        <ul>
          <li>Keynotes de CEOs de empresas tecnológicas líderes</li>
          <li>Paneles de discusión sobre inteligencia artificial, blockchain y realidad virtual</li>
          <li>Talleres prácticos de programación y diseño</li>
          <li>Zona de exposición con las últimas novedades tecnológicas</li>
          <li>Sesiones de networking y reclutamiento</li>
        </ul>
        
        <p>Este año contamos con ponentes de Google, Microsoft, Amazon, Meta y numerosas startups innovadoras que compartirán su visión sobre el futuro de la tecnología y las oportunidades emergentes en el sector.</p>
      `,
    date: "15-17 Jul 2023",
    time: "09:00 - 19:00",
    location: "Palacio de Convenciones, La Habana",
    fullAddress: "Calle 146 e/ 11 y 13, Playa, La Habana, Cuba",
    image: "/images/events/tech-conference.jpeg",
    gallery: [
      "/images/events/tech-conference-1.jpg",
      "/images/events/tech-conference-2.jpg",
      "/images/events/tech-conference-3.jpg",
    ],
    categories: ["Tecnología", "Conferencia"],
    state: "Próximamente",
    organizer: "Instituto Cubano de la Música",
    attendees: 450,
    capacity: 1000,
    ticketTypes: [
      { name: "Pase Estándar", price: 75, available: true },
      { name: "Pase Premium", price: 150, available: true },
      { name: "Pase Estudiante", price: 35, available: true },
    ],
    faqs: [
      {
        question: "¿Las conferencias estarán en inglés o español?",
        answer:
          "Habrá traducción simultánea para todas las conferencias principales. Los talleres se impartirán en el idioma indicado en el programa.",
      },
      {
        question: "¿Se entregará certificado de asistencia?",
        answer:
          "Sí, todos los asistentes recibirán un certificado digital de participación.",
      },
      {
        question: "¿Habrá oportunidades de trabajo?",
        answer:
          "Contaremos con una zona de reclutamiento donde importantes empresas buscarán talento.",
      },
    ],
  },
  {
    id: 3,
    name: "Maratón Solidario",
    description:
      "Carrera benéfica para recaudar fondos para proyectos educativos en zonas desfavorecidas.",
    longDescription: `
        <p>El Maratón Solidario es una carrera benéfica cuyo objetivo principal es recaudar fondos para proyectos educativos en zonas desfavorecidas. Cada kilómetro recorrido se traduce en oportunidades para niños y jóvenes sin acceso a educación de calidad.</p>
        
        <p>El evento incluye diferentes modalidades para todos los niveles:</p>
        <ul>
          <li>Maratón completo: 42 km para los más experimentados</li>
          <li>Media maratón: 21 km para corredores habituales</li>
          <li>Carrera popular: 10 km abierta a todos los públicos</li>
          <li>Carrera familiar: 3 km para disfrutar con los más pequeños</li>
          <li>Caminata solidaria: 5 km sin necesidad de correr</li>
        </ul>
        
        <p>Además de la carrera, habrá actividades complementarias como talleres de estiramientos, stands informativos sobre los proyectos beneficiarios, música en vivo y una gran paella solidaria para reponer fuerzas al finalizar el evento.</p>
      `,
    date: "10 Ago 2023",
    time: "08:00 - 14:00",
    location: "Malecón Habanero, La Habana",
    fullAddress: "Malecón, Centro Habana, La Habana, Cuba",
    image: "/images/events/marathon.avif",
    gallery: [
      "/images/events/marathon-1.jpg",
      "/images/events/marathon-2.jpg",
      "/images/events/marathon-3.jpg",
    ],
    categories: ["Deporte", "Solidario"],
    state: "Abierta inscripción",
    organizer: "Fábrica de Arte Cubano (FAC)",
    attendees: 620,
    capacity: 1500,
    ticketTypes: [
      { name: "Inscripción Maratón", price: 30, available: true },
      { name: "Inscripción Media Maratón", price: 20, available: true },
      { name: "Inscripción Carrera Popular", price: 12, available: true },
      { name: "Inscripción Familiar", price: 25, available: true },
    ],
    faqs: [
      {
        question: "¿Dónde puedo recoger mi dorsal?",
        answer:
          "Los dorsales se pueden recoger el día anterior al evento de 10:00 a 20:00 en el Centro Comercial Aqua, o el mismo día de la carrera hasta 30 minutos antes de la salida.",
      },
      {
        question: "¿Hay servicio de guardarropa?",
        answer:
          "Sí, habrá un servicio gratuito de guardarropa en la zona de salida/meta.",
      },
      {
        question: "¿Qué incluye la inscripción?",
        answer:
          "La inscripción incluye camiseta técnica, dorsal con chip, avituallamientos en ruta, medalla finisher, seguro de accidentes y acceso a la paella solidaria.",
      },
    ],
  },
];
