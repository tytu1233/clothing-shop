import React from 'react'

const Statute = () => {
  return (
    <div className='container p-5'>
      <div className='d-flex justify-content-start'>
        <h1>I. Konto</h1>
      </div>
      <div className='d-flex justify-content-start ml-2'>
        <ol>
          <li>Klient uzyskuje dostęp do Konta po rejestracji.</li>
          <li>W ramach rejestracji Klient podaje imię, nazwisko, swój adres i adres e-mail oraz wybiera hasło.</li>
          <li>W celu złożenia zamówienia klient powinien posiadać konto.</li>
          <li>Klient zapewnia, że dane podane przez niego w formularzu do złożenia zamówienia są zgodne z prawdą. Złożenie zamówienia wymaga dokładnego zapoznania się z regulaminem oraz zaznaczenie w formularzu do złożenia zamówienia, że zapoznał się z jego treścią i w pełni akceptuje jego postanowienia.</li>
          <li>Konto klienta, które będzie podejrzane o nieuczciwe praktyki zostanie zablokowane.</li>
          <li>W celu uzyskania szczegółowych informacji o koncie klient powinien skonktaktować się poprzez formularz komunikacyjny.</li>
        </ol>
      </div>
      <div className='d-flex justify-content-start'>
        <h1>II. Zamówienia</h1>
      </div>
      <div className='d-flex justify-content-start ml-2'>
        <ol>
          <li>Zamówienia przyjmowane są poprzez stronę internetową localhost:3000</li>
          <li>Towary w sklepie internetowym są szczegółowo oznaczone. Na stronie internetowej znajdują się między innymi informacje o właściwościach towaru, jego cenie, materiale, z którego jest wykonany, orientacyjnej dostępności w salonach stacjonarnych.</li>
          <li>Klient zamawiając towar dokonuje jego wyboru w sposób właściwy dla danej rzeczy, określając w szczególności rozmiar, liczbę sztuk, a w razie potrzeby podając także inne specyficzne informacje (poprzez formularz kontaktowy).</li>
          <li>Klient potwierdza złożenie zamówienia poprzez kliknięcie przycisku „Zamawiam”.</li>
          <li>Następnie Sprzedawca weryfikuje, czy zamówienie może zostać przyjęte do realizacji.</li>
          <li>Po złożeniu zamówienia, na adres e-mailowy podany podczas tworzenia konta przychodzi wiadomość, w której podany jest numer konta, na który powinno zostać opłacone zamówienie</li>
          <li>W razie pytań dotyczących zamówienia klient powinien skontaktować się poprzez formularz kontaktowy dostępny na stronie sklepu. Precyzyjnie nadając temat e-maila (nr zamówienia) oraz sprecyzowanie pytania w treści</li>
        </ol>
      </div>
    </div>
  )
}

export default Statute