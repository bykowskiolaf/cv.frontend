import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const Faq = () => {
  return (
    <div className="flex w-full justify-center">
      <Accordion type="single" collapsible className="w-full md:w-1/2">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Jak mogę się zarejestrować w ChatVerse?
          </AccordionTrigger>
          <AccordionContent>
            Możesz zarejestrować się za pomocą swojego konta Google, klikając
            przycisk "Zaloguj się przez Google" na stronie głównej.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Czy mogę używać ChatVerse na telefonie?
          </AccordionTrigger>
          <AccordionContent>
            Tak, ChatVerse jest przystosowane do urządzeń mobilnych dzięki
            responsywnemu designowi.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Czy mogę usunąć swoje konto?</AccordionTrigger>
          <AccordionContent>
            Tak, do usunięcia konta wymagane jest skontaktowanie się z obsługą
            klienta przez email kontakt@chatverse.com
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>
            Jak mogę zmienić swoje dane profilowe?
          </AccordionTrigger>
          <AccordionContent>
            Dane profilowe możesz zmienić w ustawieniach swojego konta Google
            pod adresem https://myaccount.google.com/
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Czy ChatVerse jest bezpłatny?</AccordionTrigger>
          <AccordionContent>
            Tak, ChatVerse jest platformą całkowicie bezpłatną dla wszystkich
            użytkowników.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>
            Co robić, gdy napotkam błąd techniczny?
          </AccordionTrigger>   
          <AccordionContent>
            Błędy techniczne możesz zgłaszać bezpośrednio wysyłając email na
            adres wsparcie@chatverse.com.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>
            Jakie są minimalne wymagania systemowe dla aplikacji?
          </AccordionTrigger>
          <AccordionContent>
            Aplikacja wymaga przeglądarki internetowej wspierającej HTML5 i
            JavaScript, a także stabilnego połączenia z internetem.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
