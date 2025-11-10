export type Server = {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

export const servers: Server[] = [
  { id: 'server-1', name: 'Production Web Server', status: 'online', cpuUsage: 25, ramUsage: 60, storageUsage: 75 },
  { id: 'server-2', name: 'Staging API', status: 'online', cpuUsage: 10, ramUsage: 45, storageUsage: 60 },
  { id: 'server-3', name: 'Database (Primary)', status: 'warning', cpuUsage: 85, ramUsage: 92, storageUsage: 88 },
  { id: 'server-4', name: 'Database (Replica)', status: 'online', cpuUsage: 5, ramUsage: 30, storageUsage: 88 },
  { id: 'server-5', name: 'Legacy System', status: 'offline', cpuUsage: 0, ramUsage: 0, storageUsage: 0 },
];

export type Task = {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
};

export const tasks: Task[] = [
  { id: 'task-1', title: 'Design new dashboard layout', status: 'done', priority: 'high', dueDate: '2024-08-15' },
  { id: 'task-2', title: 'Develop API for user authentication', status: 'in-progress', priority: 'high', dueDate: '2024-08-20' },
  { id: 'task-3', title: 'Fix bug #1245 - Button alignment', status: 'in-progress', priority: 'medium', dueDate: '2024-08-18' },
  { id: 'task-4', title: 'Write documentation for the new API', status: 'todo', priority: 'medium', dueDate: '2024-08-25' },
  { id: 'task-5', title: 'Update dependencies', status: 'todo', priority: 'low', dueDate: '2024-09-01' },
  { id: 'task-6', title: 'Refactor database schema', status: 'todo', priority: 'high', dueDate: '2024-08-28' },
  { id: 'task-7', title: 'Deploy staging server updates', status: 'done', priority: 'medium', dueDate: '2024-08-14' },
];

export type Template = {
  id: string;
  title: string;
  description: string;
  category: 'React Component' | 'Express Middleware' | 'Docker' | 'UI/UX';
};

export const templates: Template[] = [
  { id: 'template-1', title: 'Reusable Button Component', description: 'A flexible and customizable Button component for React.', category: 'React Component' },
  { id: 'template-2', title: 'Auth Middleware', description: 'Express.js middleware for JWT authentication and authorization.', category: 'Express Middleware' },
  { id: 'template-3', title: 'Node.js Dockerfile', description: 'Standard Dockerfile for production-ready Node.js applications.', category: 'Docker' },
  { id: 'template-4', title: 'Onboarding Flow Design', description: 'Figma design template for a user onboarding experience.', category: 'UI/UX' },
];

export type Note = {
  id: string;
  title: string;
  content: string;
  language: 'javascript' | 'typescript' | 'css' | 'html' | 'bash' | 'text';
};

export const notes: Note[] = [
  { id: 'note-1', title: 'Flexbox Centering Trick', content: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', language: 'css' },
  { id: 'note-2', title: 'Async/Await Error Handling', content: 'async function fetchData() {\n  try {\n    const response = await fetch(...);\n    // ...\n  } catch (error) {\n    console.error("Failed to fetch:", error);\n  }\n}', language: 'javascript' },
  { id: 'note-3', title: 'Useful Git Commands', content: 'git fetch --prune\ngit branch -vv\ngit rebase -i HEAD~3', language: 'bash' },
  { id: 'note-4', title: 'Project Setup Checklist', content: '- Initialize npm\n- Install Next.js & React\n- Setup Tailwind CSS\n- Configure ESLint & Prettier', language: 'text' },
];

export const taskCompletionData = [
  { date: 'Mon', completed: 5 },
  { date: 'Tue', completed: 7 },
  { date: 'Wed', completed: 4 },
  { date: 'Thu', completed: 8 },
  { date: 'Fri', completed: 6 },
  { date: 'Sat', completed: 2 },
  { date: 'Sun', completed: 3 },
];

export const serverLoadData = [
    { name: 'CPU', usage: 45, fill: "var(--color-cpu)" },
    { name: 'RAM', usage: 72, fill: "var(--color-ram)" },
    { name: 'Storage', usage: 80, fill: "var(--color-storage)" },
];
