import { Contributor } from "@/types";
import icmrLogo from "@/assets/icmr-logo.png";
import nieLogo from "@/assets/nie-logo.jpeg";
import dhrLogo from "@/assets/dhr-logo.webp";
import acaiLogo from "@/assets/acai-logo.png";

export const contributors: Contributor[] = [
  {
    id: 'icmr',
    name: 'ICMR – Indian Council of Medical Research',
    role: 'funder',
    description: 'This project is funded by the Indian Council of Medical Research (ICMR) under the Virus Research and Diagnostic Laboratory (VRDL) Network initiative.',
    logo: icmrLogo,
    website: 'https://icmr.gov.in'
  },
  {
    id: 'nie',
    name: 'NIE – National Institute of Epidemiology',
    role: 'supporter',
    description: 'Technical support and epidemiological data framework provided by NIE, Chennai.',
    logo: nieLogo
  },
  {
    id: 'dhr',
    name: 'Department of Health Research',
    role: 'supporter',
    description: 'Supported under the Ministry of Health & Family Welfare, Government of India.',
    logo: dhrLogo
  },
  {
    id: 'amity',
    name: 'Amity Centre for Artificial Intelligence',
    role: 'developer',
    description: 'AI model design, development, and deployment by Amity Centre for Artificial Intelligence.',
    logo: acaiLogo,
    website: 'https://amity.edu/noida/acai/'
  }
];
