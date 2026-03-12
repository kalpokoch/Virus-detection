import { Link } from "react-router-dom";
import acaiLogo from "@/assets/acai-logo.png";
import icmrLogo from "@/assets/icmr-logo.png";
import nieLogo from "@/assets/nie-logo.jpeg";
import dhrLogo from "@/assets/dhr-logo.webp";

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start">
          {/* Left Section - Logo and Description */}
          <div className="flex w-full flex-col gap-6 lg:max-w-sm">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img
                  src={acaiLogo}
                  alt="Amity AI Logo"
                  className="h-12"
                />
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Virus Recommender System</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                AI-Powered Diagnostic Decision Support for Virus Research and Diagnosis Laboratory Network
              </p>
            </div>
          </div>

          {/* Right Section - Links Grid */}
          <div className="grid w-full gap-10 md:grid-cols-2 lg:gap-16">
            {/* Funded & Supported By */}
            <div>
              <h4 className="mb-6 text-base font-bold text-foreground">Funded & Supported By</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-background rounded p-1.5">
                    <img src={icmrLogo} alt="ICMR" className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="pt-1 font-medium text-muted-foreground hover:text-primary transition-colors">
                    ICMR – Indian Council of Medical Research
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-background rounded p-1.5">
                    <img src={nieLogo} alt="NIE" className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="pt-1 font-medium text-muted-foreground hover:text-primary transition-colors">
                    NIE – National Institute of Epidemiology
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-background rounded p-1.5">
                    <img src={dhrLogo} alt="DHR" className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="pt-1 font-medium text-muted-foreground hover:text-primary transition-colors">
                    Department of Health Research
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-base font-bold text-foreground">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li className="font-medium text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/">Home</Link>
                </li>
                <li className="font-medium text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/prediction">Prediction</Link>
                </li>
                <li className="font-medium text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/contributors">Contributors</Link>
                </li>
                <li className="pt-6 text-muted-foreground">
                  Built under ICMR VRDL Network
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Amity Centre for Artificial Intelligence. Funded by ICMR.</p>
        </div>
      </div>
    </footer>
  );
}
