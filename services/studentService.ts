import { Student } from '../types';

const SHEET_ID = '1eQ-9icZxyaM5PwEX4w5oETDKx4STCK2Edg_w_GIyTZ4';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&t=${Date.now()}`;

export const studentService = {
  async login(regId: string, roll: string): Promise<Student | null> {
    const searchReg = regId.trim().toUpperCase();
    const searchRoll = roll.trim();

    try {
      const response = await fetch(SHEET_URL, { 
        method: 'GET',
        headers: { 'Accept': 'text/csv' }
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const csvText = await response.text();
      const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
      
      if (lines.length < 2) return null;

      // Clean headers from quotes and whitespace
      const headers = lines[0].split(',').map(h => h.toLowerCase().trim().replace(/^"|"$/g, ''));
      
      const regIndex = headers.findIndex(h => h.includes('registration'));
      const rollIndex = headers.findIndex(h => h.includes('roll'));
      
      if (regIndex === -1 || rollIndex === -1) return null;

      let targetRow: string[] | null = null;

      for (let i = 1; i < lines.length; i++) {
        // Improved CSV splitting to handle quotes properly
        const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
        const cleanRow = row.map(cell => cell.replace(/^"|"$/g, '').trim());

        if (cleanRow[regIndex]?.toUpperCase() === searchReg && cleanRow[rollIndex] === searchRoll) {
          targetRow = cleanRow;
          break;
        }
      }

      if (!targetRow) return null;

      const getVal = (keywords: string[]) => {
        const idx = headers.findIndex(h => keywords.some(k => h.includes(k)));
        return (idx !== -1 && targetRow![idx]) ? targetRow![idx] : '';
      };

      const finalRegId = targetRow[regIndex];
      
      return {
        registrationId: finalRegId,
        rollNumber: targetRow[rollIndex],
        name: getVal(['student name', 'name']),
        bnName: getVal(['bangla name', 'bangla']),
        school: getVal(['institution', 'school']),
        class: getVal(['class', 'grade']),
        district: getVal(['district']),
        phone: getVal(['phone']),
        email: getVal(['email']),
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${finalRegId}`,
        category: getVal(['category']),
        status: (getVal(['status']).toLowerCase().includes('reject') ? 'Rejected' : 'Selected') as any,
        selectionStatus: 'Passed',
        semiStatus: 'Pending',
        finalStatus: 'Not Started',
        score: getVal(['selection score', 'score', 'marks']),
        rank: getVal(['national rank', 'rank', 'মেধা'])
      };
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('তথ্য লোড করতে সমস্যা হচ্ছে। ইন্টারনেট চেক করুন।');
    }
  }
};