export interface Lists {
  Mot: string;
  Adverbe?: 0 | 1;
  Animaux?: 0 | 1;
  Gentile?: 0 | 1;
  Verbe?: 0 | 1;
}

export interface ManagementDataItem extends Lists {
  date_creation: string;
  createur_id: number;
  username: string;
  image: string;
  id:number;
}

export interface ManagementMetaData {
  searchTerm: string;
  timestamp: string;
  resultsCount: number;
}

export type ManagementDataItems = ManagementDataItem[]

export interface Management {
  success: boolean;
  query: string;
  data: ManagementDataItems;
  total: string;
  hasMore: number;
  metadata: ManagementMetaData;
}
