import normalizeCityName from "../../utils/normalize";

const getFontSizeByScreen = () => {
  if (typeof window === "undefined") return 12;
  const width = window.innerWidth;

  if (width > 2300) return 13;
  if (width > 1900) return 11;
  if (width > 1800) return 10;
  if (width > 1500) return 9;
  if (width > 1440) return 9;
  if (width > 1300) return 8;
  if (width > 1000) return 7;
  // if (width > 768) return 8;
  return 10;
};

const getBarThickness_1 = () => {
  if (typeof window === "undefined") return 12;
  const width = window.innerWidth;

  if (width > 1800) return 20;
  if (width > 1500) return 18;
  if (width > 1440) return 18;
  if (width > 1000) return 10;

  // if (width > 768) return 8;
  return 10;
};

const getBarThickness_2 = () => {
  if (typeof window === "undefined") return 12;
  const width = window.innerWidth;

  if (width > 2000) return 20;
  if (width > 1960) return 18;
  if (width > 1400) return 12;

  if (width > 500) return 10;

  return 10;
};

const getBborderWidth = () => {
  if (typeof window === "undefined") return 12;
  const width = window.innerWidth;

  if (width > 1800) return 3;
  if (width > 1700) return 2;
  if (width > 1440) return 1;
  if (width > 500) return 1;
  return 10;
};

const getPointRadius = () => {
  if (typeof window === "undefined") return 12;
  const width = window.innerWidth;

  if (width > 1800) return 5;
  if (width > 1700) return 3;
  if (width > 1440) return 2;
  if (width > 500) return 2;

  return 10;
};

export const hideZeroFormatter = (value: number) => {
  return value === 0 ? null : value;
};

import type {
  ActualizationStatus,
  AgreementTrends,
  CompareAreas,
  IndustryCoverage,
  OrganizationTypes,
  OwnershipStructure,
  QuarterlyTrends,
} from "@/types/chartTypes";

export const organizationTypesData = (data: OrganizationTypes | null) => {
  return {
    labels: ["Малая", "Средняя", "Крупная"],
    // lables: Array<keyof OrganizationTypes>,
    datasets: [
      {
        data: [data?.Малая || 0, data?.Средняя || 0, data?.Крупная || 0],
        backgroundColor: ["#7267A8", "#7956A8", "#C8C2FE"],
        borderColor: "#1E102B",
        borderWidth: 2,
        // borderWidth: 0,
        hoverBorderWidth: 0,
      },
    ],
  };
};

export const ownershipStructureData = (data: OwnershipStructure | null) => {
  return {
    labels: ["Муниципальная", "Частная", "Государственная"],
    // labels: Array<keyof OwnershipStructure>,
    datasets: [
      {
        data: [data?.Муниципальная || 0, data?.Частная || 0, data?.Государственная || 0],
        backgroundColor: ["#4C84CF", "#6DA2E9", "#C1D8F7"],
        borderColor: "#1E102B",
        borderWidth: 2,
        // borderWidth: 0,
        hoverBorderWidth: 0,
      },
    ],
  };
};

export const pieOptions = () => {
  return {
    // responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      title: false,
      legend: false,
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "#fff",
        font: {
          family: "Montserrat",
          size: getFontSizeByScreen(),
          // weight: "bold",
          // style: "italic",
          // lineHeight: 1.2,
        },

        formatter: (value: number) => value,
        anchor: "end",
        align: "end",
        offset: -25,
      },
    },
  };
};

export const quarterlyTrendsData = (data: QuarterlyTrends | null) => {
  if (!data) return null;

  const today = new Date().getFullYear();

  const labels = ["1 квартал", "2 квартал", "3 квартал", "4 квартал"];

  const dataset1 = labels.map((quarter: string) => {
    return data["Коллективные договоры"][`${quarter} ${today}`] || 0;
  });

  const dataset2 = labels.map((quarter) => {
    return data["Отраслевые соглашения"][`${quarter} ${today}`] || 0;
  });

  return {
    labels,
    datasets: [
      {
        label: "Коллективные договоры",
        data: dataset1,
        borderColor: "#8E44AD",
        backgroundColor: "#8E44AD",
        pointBackgroundColor: "#8E44AD",
        pointBorderColor: "#8E44AD",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),

        borderWidth: getBborderWidth(),
      },
      {
        label: "Отраслевые соглашения",
        data: dataset2,
        borderColor: "#4C84CF",
        backgroundColor: "#4C84CF",
        pointBackgroundColor: "#4C84CF",
        pointBorderColor: "#4C84CF",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),
        borderWidth: getBborderWidth(),
      },
    ],
  };
};

export const agreementTrendsData = (data: AgreementTrends | null) => {
  if (!data) return null;

  const labels = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const dataset1 = labels.map((month) => {
    return data["Коллективные договоры"][month] || 0;
  });

  const dataset2 = labels.map((month) => {
    return data["Отраслевые соглашения"][month] || 0;
  });

  return {
    labels,
    datasets: [
      {
        label: "Коллективные договоры",
        data: dataset1,
        borderColor: "#8E44AD",
        backgroundColor: "#8E44AD",
        pointBackgroundColor: "#8E44AD",
        pointBorderColor: "#8E44AD",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),

        borderWidth: getBborderWidth(),
      },
      {
        label: "Отраслевые соглашения",
        data: dataset2,
        borderColor: "#4C84CF",
        backgroundColor: "#4C84CF",
        pointBackgroundColor: "#4C84CF",
        pointBorderColor: "#4C84CF",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),
        borderWidth: getBborderWidth(),
      },
    ],
  };
};

export const industryCoverageData = (data: IndustryCoverage | null) => {
  if (!data) return null;

  const labels = [
    "Воловский МО",
    "Грязинский МР",
    "Данковский МР",
    "Добринский МР",
    "Добровский МО",
    "Долгоруковский МР",
    "г. Елец",
    "Елецкий МР",
    "Задонский МР",
    "Измалковский МО",
    "Краснинский МР",
    "Лебедянский МР",
    "Лев-Толстовский МР",
    "г. Липецк",
    "Липецкий МР",
    "Становлянский МО",
    "Тербунский МР",
    "Усманский МР",
    "Хлевенский МР",
    "Чаплыгинский МР",
  ];

  const dataset1 = labels.map((city) => {
    const normalizedCity = normalizeCityName(city);
    return data[normalizedCity]?.образование || 0;
  });

  const dataset2 = labels.map((city) => {
    const normalizedCity = normalizeCityName(city);
    return data[normalizedCity]?.медицина || 0;
  });

  const dataset3 = labels.map((city) => {
    const normalizedCity = normalizeCityName(city);
    return data[normalizedCity]?.культура || 0;
  });

  const dataset4 = labels.map((city) => {
    const normalizedCity = normalizeCityName(city);
    return data[normalizedCity]?.["иные отрасли"] || 0;
  });

  return {
    labels,
    datasets: [
      {
        label: "Иные отрасли",
        data: dataset4,
        borderColor: "#7267A8",
        // borderColor: "red",
        backgroundColor: "#7267A8",
        pointBackgroundColor: "#7267A8",
        pointBorderColor: "#7267A8",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),
        borderWidth: getBborderWidth(),
      },
      {
        label: "Образование",
        data: dataset1,
        borderColor: "#576EB2",
        backgroundColor: "#576EB2",
        pointBackgroundColor: "#576EB2",
        pointBorderColor: "#576EB2",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),
        borderWidth: getBborderWidth(),
      },
      {
        label: "Медицина",
        data: dataset2,
        borderColor: "#9B8EDE",
        backgroundColor: "#9B8EDE",
        pointBackgroundColor: "#9B8EDE",
        pointBorderColor: "#9B8EDE",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),
        borderWidth: getBborderWidth(),
      },
      {
        label: "Культура",
        data: dataset3,
        borderColor: "#3258C9",
        backgroundColor: "#3258C9",
        pointBackgroundColor: "#3258C9",
        pointBorderColor: "#3258C9",
        // tension: 0.1,
        tension: 0,
        pointRadius: getPointRadius(),
        borderWidth: getBborderWidth(),
      },
    ],
  };
};

export const lineOptions = (isItalic: boolean, max: number, stepSize: number) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        offset: 1,
        color: "#fff",
        font: {
          family: "Montserrat",
          size: getFontSizeByScreen(),
        },
        formatter: hideZeroFormatter,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
          font: {
            family: "Montserrat",
            size: getFontSizeByScreen(),
          },
          ...(isItalic && {
            rotation: 30,
            autoSkip: false,
            maxRotation: 30,
            minRotation: 30,
          }),
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderDash: [4, 4], // пунктир: 5px линия, 5px пробел
          lineWidth: 1,
        },
      },

      y: {
        position: "right",
        beginAtZero: true,
        // min: 0,
        max: max,
        ticks: {
          stepSize: stepSize, // шаг между числами
          color: "#ccc",
          font: {
            family: "Montserrat",
            size: getFontSizeByScreen(),
          },
          // callback: (value) => value + " шт.",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderDash: [4, 4],
          lineWidth: 1,
        },
      },
    },
  };
};

export const compareAreasData = (data: CompareAreas | null, labels) => {
  if (!data) return null;

  const dataset1 = labels.map((label: Array<keyof CompareAreas>) => data[label]["МО"]);

  const dataset2 = labels.map(
    (label: Array<keyof CompareAreas>) => data[label]["Липецкая область"],
  );

  return {
    labels: labels,
    datasets: [
      {
        label: "МО",
        data: dataset1,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        // borderRadius: 4,
        barThickness: getBarThickness_1(), //высота графика
      },
      {
        label: "Лип область",
        data: dataset2,
        backgroundColor: "rgba(54, 162, 235, 1)",
        // borderRadius: 4,
        barThickness: getBarThickness_1(),
      },
    ],
  };
};

export const actualizationStatusData = (data: ActualizationStatus | null, labels) => {
  if (!data) return null;

  const dataset1 = labels.map(
    (label: Array<keyof ActualizationStatus>) => data[label]["не актуализировано"],
  );

  const dataset2 = labels.map(
    (label: Array<keyof ActualizationStatus>) => data[label]["данные актуализированы"],
  );

  return {
    labels: labels,
    datasets: [
      {
        label: "не актуализировано",
        data: dataset1,
        backgroundColor: "#C8C2FE",
        // borderRadius: 4,
        barThickness: getBarThickness_2(), //высота графика
      },
      {
        label: "данные актуализированы",
        data: dataset2,
        backgroundColor: "#9B8EDE",
        // borderRadius: 4,
        barThickness: getBarThickness_2(),
      },
    ],
  };
};

export const barOptions = (labels, max: number,) => {
  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        // offset: -10,

        color: "#fff",

        font: {
          family: "Montserrat",
          size: getFontSizeByScreen(),
        },
        formatter: (value: number) => value,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
          font: {
            family: "Montserrat",
            size: getFontSizeByScreen(),
          },
        },
        max: max,
      },
      y: {
        grid: {
          display: false,
          drawBorder: true,
          borderColor: "#fff",
        },
        ticks: {
          color: "#fff",
          font: {
            family: "Montserrat",
            size: getFontSizeByScreen(),
          },
          callback: function (index: number) {
            return labels[index].split(" ");
          },
        },
        border: {
          color: "#fff",
          width: 2,
        },
      },
    },
  };
};
