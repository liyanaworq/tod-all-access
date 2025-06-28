export interface UserCustomer {
  _id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Booking {
  _id: string;
  resourceId: string;
  outletId: string;
  bookingType: 'HOT_DESK' | 'MEETING_ROOM';
  checkIn: string;
  status: 'active' | 'inactive';
}
