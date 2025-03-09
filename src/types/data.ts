import { Event } from './events.ts';

export const eventsData: Event[] = [
  {
    eventid: 'MK25E0001',
    eventname: 'Astronomy through Telescopes - Exhibition',
    description: 'Astronomical telescopes will be put on display during the Mindkraft event.',
    type: 'tech',
    category: 1,
    category_name: 'Non - Technical',
    division: 'Physical Sciences',
    start_time: '2025-03-21T09:00:00Z',
    end_time: '2025-03-22T18:00:00Z',
    price: '0',
    participation_strength_setlimit: 'School students',
    coordinators: {
      faculty: {
        name: 'Dr. D.Khanna (1185)',
        phone: '9080776415',
        email: 'davidkhanna@karunya.edu',
      },
      student: {
        name: 'Mr. Nitin Oliver P',
        phone: '9080776415(Faculty),9894928737(Student)',
        email: 'nithinoliver23@karunya.edu.in',
      },
    },
  },
  {
    eventid: 'MK25E0002',
    eventname: 'CTF',
    description: 'Each team will be given clues from which they have to decode it and find the hidden flag in it using their skills.',
    type: 'tech',
    category: 1,
    category_name: 'Technical',
    division: 'AIML',
    start_time: '2025-03-21T09:00:00Z',
    end_time: '2025-02-10T18:55:36Z',
    price: '150',
    participation_strength_setlimit: '90',
    coordinators: {
      faculty: {
        name: 'Angelin Jeba & 2767',
        phone: '7094687611(Faculty)\n8547666222(Student)',
        email: 'angelinjeba@karunya.edu.in',
      },
      student: {
        name: 'Johan Joseph',
        phone: '7094687611(Faculty)\n8547666222(Student)',
        email: 'johanjoseph@karunya.edu.in',
      },
    },
  },
  // Add more events as needed
];