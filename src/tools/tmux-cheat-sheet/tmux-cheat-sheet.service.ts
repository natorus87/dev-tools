export interface TmuxCommand {
  key: string;
  description: string;
}

export interface TmuxCategory {
  title: string;
  commands: TmuxCommand[];
}

export const tmuxCheatSheetData: TmuxCategory[] = [
  {
    title: 'Sessions',
    commands: [
      { key: 'tmux', description: 'Start a new session' },
      { key: 'tmux new -s name', description: 'Start a new session with name' },
      { key: 'tmux ls', description: 'List running sessions' },
      { key: 'tmux a', description: 'Attach to the last session' },
      { key: 'tmux a -t name', description: 'Attach to a session by name' },
      { key: 'tmux kill-session -t name', description: 'Kill a specific session' },
      { key: 'prefix d', description: 'Detach from the current session' },
      { key: 'prefix $', description: 'Rename current session' },
    ],
  },
  {
    title: 'Windows (Tabs)',
    commands: [
      { key: 'prefix c', description: 'Create a new window' },
      { key: 'prefix w', description: 'List windows' },
      { key: 'prefix n', description: 'Go to next window' },
      { key: 'prefix p', description: 'Go to previous window' },
      { key: 'prefix 0 to 9', description: 'Select window by number' },
      { key: 'prefix ,', description: 'Rename current window' },
      { key: 'prefix &', description: 'Kill current window' },
    ],
  },
  {
    title: 'Panes (Splits)',
    commands: [
      { key: 'prefix %', description: 'Split pane vertically' },
      { key: 'prefix "', description: 'Split pane horizontally' },
      { key: 'prefix arrow', description: 'Navigate panes' },
      { key: 'prefix q', description: 'Show pane numbers' },
      { key: 'prefix o', description: 'Swap panes' },
      { key: 'prefix x', description: 'Kill current pane' },
      { key: 'prefix z', description: 'Toggle pane zoom (fullscreen)' },
    ],
  },
  {
    title: 'Copy Mode',
    commands: [
      { key: 'prefix [', description: 'Enter copy mode' },
      { key: 'space', description: 'Start selection' },
      { key: 'enter', description: 'Copy selection' },
      { key: 'prefix ]', description: 'Paste contents' },
    ],
  },
];
