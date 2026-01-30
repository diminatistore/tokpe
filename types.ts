
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  sold: number;
  rating: number;
  image?: string;
  avgSoldPerDay?: number;
  lastRestockDate?: string;
  reorderPoint?: number;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'Selesai' | 'Diproses' | 'Dibatalkan' | 'Dikirim' | 'Pending';
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AppState {
  activeTab: 'dashboard' | 'products' | 'orders' | 'ai-research' | 'smart-stock';
  isLoading: boolean;
  history: ChatMessage[];
}

// Added DataRow interface for flexible data structure mapping
export interface DataRow {
  [key: string]: any;
}

// Added Dataset interface to group name, columns and data for the analysis feature
export interface Dataset {
  name: string;
  columns: string[];
  data: DataRow[];
}
