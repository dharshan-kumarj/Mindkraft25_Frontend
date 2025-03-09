export interface Event {
    eventid: string;
    eventname: string;
    description: string;
    type: string;
    category: number;
    category_name: string;
    division: string;
    start_time: string;
    end_time: string;
    price: string;
    participation_strength_setlimit: string;
    coordinators: {
      faculty: {
        name: string;
        phone: string;
        email: string;
      };
      student: {
        name: string;
        phone: string;
        email: string;
      };
    };
  }