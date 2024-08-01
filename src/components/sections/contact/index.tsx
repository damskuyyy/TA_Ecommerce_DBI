import React from 'react';

const Contact = () => {
  return (
    <div className='w-full flex flex-col gap-16'>
      <h1 className='text-center text-5xl font-semibold'>Contact Us</h1>
      <div className='flex justify-between lg:flex-row flex-col w-full gap-10'>
        <div className='lg:w-1/2 w-full'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.6229865106893!2d114.34893827505692!3d-8.24061209179255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd15abdd13e4fb5%3A0x1d2dcf43663aacf!2sJl.%20Sutawijaya%20No.89%2C%20Sumberrejo%2C%20Kec.%20Banyuwangi%2C%20Kabupaten%20Banyuwangi%2C%20Jawa%20Timur%2068419!5e0!3m2!1sen!2sid!4v1722494184473!5m2!1sen!2sid" width={600} height={450} className='rounded-md w-full' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <div className='flex flex-col gap-5 lg:w-1/2 w-full'>
          <div className='flex items-start flex-col gap-1 w-full'>
            <p className='font-medium'>Alamat kantor :</p>
            <p>Jln.Sutawijaya No.89 Kelurahan Sumberrejo Rt.002 Rw.002 <br /> Kecamatan Banyuwangi Kabupaten Banyuwangi 68419 <br /> Jawa Timur Indonesia</p>
          </div>
          <div className='flex items-start flex-col gap-1 w-full'>
            <p className='font-medium'>Nomor contact :</p>
            <p>087863005800 | 081336494664</p>
          </div>
          <div className='flex items-start flex-col gap-1 w-full'>
            <p className='font-medium'>Email :</p>
            <p>digitalblockchainindonesia@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;