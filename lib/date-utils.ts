export function formatEventDate(dateString: string | Date) {
  // Intentar diferentes formatos de fecha
  let date: Date;

  // Si ya es un objeto Date válido
  if (dateString instanceof Date && !isNaN(dateString.getTime())) {
    date = dateString;
  }
  // Si es una cadena, intentar parsearla
  else if (typeof dateString === "string") {
    // Intentar formato ISO primero
    date = new Date(dateString);

    // Si no es válida, intentar otros formatos comunes
    if (isNaN(date.getTime())) {
      // Formato DD/MM/YYYY
      const ddmmyyyy = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (ddmmyyyy) {
        date = new Date(
          parseInt(ddmmyyyy[3]),
          parseInt(ddmmyyyy[2]) - 1,
          parseInt(ddmmyyyy[1])
        );
      }
      // Formato MM/DD/YYYY
      else {
        const mmddyyyy = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (mmddyyyy) {
          date = new Date(
            parseInt(mmddyyyy[3]),
            parseInt(mmddyyyy[1]) - 1,
            parseInt(mmddyyyy[2])
          );
        }
        // Si todo falla, usar fecha por defecto (mañana)
        else {
          date = new Date();
          date.setDate(date.getDate() + 1);
        }
      }
    }
  }
  // Fallback a fecha por defecto
  else {
    date = new Date();
    date.setDate(date.getDate() + 1);
  }

  return date;
}

export function formatEventDateDisplay(dateString: string) {
  const date = formatEventDate(dateString);

  try {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.warn("Error formatting date:", error);
    return "Fecha por confirmar";
  }
}

export function formatEventTimeDisplay(dateString: string) {
  const date = formatEventDate(dateString);

  try {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.warn("Error formatting time:", error);
    return "Hora por confirmar";
  }
}

export function isValidEventDate(dateString: string): boolean {
  const date = formatEventDate(dateString);
  return !isNaN(date.getTime());
}

export function getEventDateInfo(dateString: string) {
  const date = formatEventDate(dateString);
  const now = new Date();
  const isValid = !isNaN(date.getTime());

  if (!isValid) {
    return {
      isValid: false,
      isPast: false,
      isToday: false,
      isTomorrow: false,
      daysUntil: 0,
      formattedDate: "Fecha por confirmar",
      formattedTime: "Hora por confirmar",
      relativeTime: "Fecha por confirmar",
    };
  }

  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let relativeTime = "";
  if (diffDays < 0) {
    relativeTime = "Evento finalizado";
  } else if (diffDays === 0) {
    relativeTime = "Hoy";
  } else if (diffDays === 1) {
    relativeTime = "Mañana";
  } else if (diffDays <= 7) {
    relativeTime = `En ${diffDays} días`;
  } else if (diffDays <= 30) {
    relativeTime = `En ${Math.ceil(diffDays / 7)} semanas`;
  } else {
    relativeTime = `En ${Math.ceil(diffDays / 30)} meses`;
  }

  return {
    isValid: true,
    isPast: diffDays < 0,
    isToday: diffDays === 0,
    isTomorrow: diffDays === 1,
    daysUntil: diffDays,
    formattedDate: formatEventDateDisplay(dateString),
    formattedTime: formatEventTimeDisplay(dateString),
    relativeTime,
  };
}
