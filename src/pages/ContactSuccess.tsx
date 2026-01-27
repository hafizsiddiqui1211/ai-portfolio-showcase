import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSuccess = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-lg mx-auto shadow-custom-lg border-border animate-fade-up">
          <CardContent className="pt-12 pb-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-accent/10 rounded-full">
                <CheckCircle className="h-16 w-16 text-accent" />
              </div>
            </div>
            
            <h1 className="text-3xl font-heading font-bold mb-4">
              Message Received!
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Thank you for reaching out. I've received your message and will get back to you within 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/contact">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Contact
                </Link>
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactSuccess;
