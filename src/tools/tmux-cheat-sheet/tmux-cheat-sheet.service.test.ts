import { expect, describe, it } from 'vitest';
import { tmuxCheatSheetData } from './tmux-cheat-sheet.service';

describe('tmux-cheat-sheet.service', () => {
  it('should format tmux structure properly', () => {
    expect(tmuxCheatSheetData.length).toBeGreaterThan(0);
    expect(tmuxCheatSheetData[0].title).toBe('Sessions');
    expect(tmuxCheatSheetData[0].commands.length).toBeGreaterThan(0);
  });
});