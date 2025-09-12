'use client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import { PiPlaceholder } from 'react-icons/pi';

export default function CustomizedServicesPage() {

  const [PhoneNumber, setPhoneNumber] = useState("");
  return (
    <main className="max-w-8xl mx-auto p-8 main-bg">
      <h1 className="text-3xl font-bold text-center mb-8">
        CUSTOMIZED SERVICES
      </h1>

      <form
        action="https://bewinetours.com/en/servicios-personalizados/"
        method="post"
        className="space-y-6"
      >

        <div className="form-container">
          <input
            type="text"
            name="g5161-nombre"
            id="g5161-nombre"
            placeholder="Full Name"
            required
            className="form-input"
          />
          <label htmlFor="g5161-nombre" className="form-label">
            Full Name <span className="form-required">(required)</span>
          </label>
        </div>


        <div className="form-container">
          <input
            type="email"
            name="g5161-correoelectrnico"
            id="g5161-correoelectrnico"
            placeholder="Email"
            required
            className="form-input"
          />
          <label htmlFor="g5161-correoelectrnico" className="form-label">
            Email <span className="form-required">(required)</span>
          </label>
        </div>

        <div className="form-container phoneInput">
            <PhoneInput
                country="us"
                disableCountryCode={true}
                inputProps={{
                    name: 'phone',
                    id: 'phone',
                    placeholder: ' ',
                    required: true
                }}
                value={PhoneNumber}
                onChange={setPhoneNumber}
                containerClass="phone-input-container"
                inputClass="phone-input-field"
                buttonClass="phone-input-flag"
            />
            <label htmlFor="phone" 
            className={`phone-label ${
                PhoneNumber ? "filled": ""
            }`}
            >
                <span className="bold">Telephone</span>{" "} 
                <span className='light'>(required)</span>
            </label>
        </div>
        

        <div className="form-row">
          <div className="form-container">
            <input
              type="date"
              name="g5161-desde"
              id="g5161-desde"
              placeholder="From (DD/MM/YYYY)"
              required
              className="form-input"
            />
            <label htmlFor="g5161-desde" className="form-label">
              From (DD/MM/YYYY) <span className="form-required">(required)</span>
            </label>
          </div>

          <div className="form-container">
            <input
              type="date"
              name="g5161-hasta"
              id="g5161-hasta"
              placeholder="Until (DD/MM/YYYY)"
              required
              className="form-input"
            />
            <label htmlFor="g5161-hasta" className="form-label">
              Until (DD/MM/YYYY) <span className="form-required">(required)</span>
            </label>
          </div>
        </div>

        <div className="form-container">
          <input
            type="number"
            name="g5161-cantidaddepersonas"
            id="g5161-cantidaddepersonas"
            placeholder="Amount of people"
            required
            className="form-input"
          />
          <label htmlFor="g5161-cantidaddepersonas" className="form-label">
            Amount of people <span className="form-required">(required)</span>
          </label>
        </div>


        <div className="form-container">
          <textarea
            name="g5161-detallesdelaconsulta"
            id="g5161-detallesdelaconsulta"
            rows={6}
            placeholder="Query Details"
            className="form-input"
          />
          <label htmlFor="g5161-detallesdelaconsulta" className="form-label">
            Query Details
          </label>
        </div>

        <div className="form-container">
        <button type="submit" className="form-button">
          Send
        </button>
        </div>
      </form>
    </main>
  );
}
