import fs from 'fs';
import path from 'path';

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function loadTLDs(): string[] {
  const filePath = path.resolve(__dirname, 'tlds.txt');
  const tldsData = fs.readFileSync(filePath, 'utf-8');
  return tldsData
    .split('\n')
    .map(tld => tld.trim())
    .filter(tld => tld && !tld.startsWith('#'));
}

const validTLDs: string[] = loadTLDs();

function validateEmail(email: string): boolean {
  if (!emailRegex.test(email)) {
    return false;
  }

  const domain: string = email.split('@')[1];
  const tld: string = domain.split('.').pop() ?? '';

  return validTLDs.includes(tld.toUpperCase());
}

export default validateEmail;
