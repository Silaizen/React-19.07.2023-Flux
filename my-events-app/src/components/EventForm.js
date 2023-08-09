import React, { useState } from 'react';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Додано подію:', eventData);
    setEventData({
      title: '',
      date: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Назва події:
          <input type="text" name="title" value={eventData.title} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Дата події:
          <input type="date" name="date" value={eventData.date} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Опис:
          <textarea name="description" value={eventData.description} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Додати подію</button>
    </form>
  );
};

export default EventForm;