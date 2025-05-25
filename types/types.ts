export type Event = {
  id: number;
  name: string;
  date: string;
  duration: string;
  price: number;
  location: string;
  description: string;
  image: string;
  categories: string[];
  state: string;
  attendees?: number;
  tickets?: number;
};