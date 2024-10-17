import validTLDs from './tlds'; // this is the generated ts file

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email: string): boolean {
  if (!emailRegex.test(email)) {
    return false;
  }

  const domain: string = email.split('@')[1];
  const tld: string = domain.split('.').pop() ?? '';

  return validTLDs.includes(tld.toUpperCase());
}

export default validateEmail;
