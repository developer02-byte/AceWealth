import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { ContactMessageInput } from "@shared/routes";

export function useCreateContactMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactMessageInput) => {
      const res = await fetch('/acewealth/demo/3/api/send_enquiry.php', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let errorMessage = `Failed to send message (HTTP ${res.status}).`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If it fails to parse JSON, it's likely a WAF block (HTML page)
          if (res.status === 409) {
            errorMessage = "Server Firewall Blocked Request (HTTP 409). Contact your host to whitelist this.";
          }
        }
        throw new Error(errorMessage);
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for reaching out. We will get back to you shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
