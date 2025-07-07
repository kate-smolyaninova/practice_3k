export type OrganizationTypes = {
  Малая: number;
  Средняя: number;
  Крупная: number;
};

export type OwnershipStructure = {
  Муниципальная: number;
  Частная: number;
  Государственная: number;
};

type QuarterlyValues = {
  [quarter: string]: number;
};

export type QuarterlyTrends = {
  "Коллективные договоры": QuarterlyValues;
  "Отраслевые соглашения": QuarterlyValues;
};

type MonthValues = {
  [month: string]: number;
};

export type AgreementTrends = {
  "Коллективные договоры": MonthValues;
  "Отраслевые соглашения": MonthValues;
};

type IndustryValues = {
  "медицина": number;
  "образование": number;
  "иные отрасли": number;
  "культура": number;
};

export type IndustryCoverage = {
  [city: string]: IndustryValues;
};

type RegionData = {
  "Липецкая область": number;
  "МО": number;
};

export type CompareAreas = {
  "Коллективные договоры": RegionData;
  "Отраслевые соглашения": RegionData;
  "Финансирование": RegionData;
};

type ActualData = {
  "не актуализировано": number;
  "данные актуализированы": number;
};

export type ActualizationStatus = {
  "Коллективные договоры": ActualData;
  "Отраслевые соглашения": ActualData;
  "Финансирование": ActualData;
  "Реестр работодателей": ActualData;
};
