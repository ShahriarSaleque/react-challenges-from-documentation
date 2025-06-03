// Challenge - 1

import { useState } from 'react';

export default function Picture() {
const [isActive, setIsActive] = useState(false);

  return (
    <div className={`background ${isActive ? '' : 'background--active'}`} onClick={() => setIsActive(false)}>
      <img
         onClick={(e) => {
            e.stopPropagation();
            setIsActive(true)
         }}
        className={`picture ${isActive ? 'picture--active' : ''}`}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}


// Challenge - 2 

import {useState} from 'react'; 

export default function EditProfile() {
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Jacobs');
  const [editMode, setEditMode] = useState(false); 
  
  return (
    <form onSubmit={(e) => { 
      e.preventDefault();
      setEditMode(!editMode);
    }}>
      <label>
        First name:{' '}
        {editMode ? <b>{firstName}</b> : <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />}
        
      </label>
      <label>
        Last name:{' '}
        {editMode ? <b>Jacobs</b> : <input />}
        
      </label>
      <button type="submit" >
        Edit Profile
      </button>
      <p><i>Hello, Jane Jacobs!</i></p>
    </form>
  );
}


// Challenge - 3 
// dont put props in the usetate 
// as useState is called only once when the component mounts 

export default function Clock(props) {
  const propColor = props.color;  
  return (
    <h1 style={{ color: propColor }}>
      {props.time}
    </h1>
  );
}

/// getting rid of reduntant and derivative state 

import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];



export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);

  const checkAmountOfPackedItems = (items) => {
      return items.filter(item => item.packed).length      
}
  
  function handleAddItem(title) {
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false
      }
    ]);
  }

  function handleChangeItem(nextItem) {
    setItems(items.map(item => {
      if (item.id === nextItem.id) {
        return nextItem;
      } else {
        return item;
      }
    }));
  }

  function handleDeleteItem(itemId) {
    setItems(
      items.filter(item => item.id !== itemId)
    );
  }

  return (
    <>  
      <AddItem
        onAddItem={handleAddItem}
      />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>{checkAmountOfPackedItems(items)} out of {items.length} packed!</b>
    </>
  );
}

// Challenge - 4 
// Toggle checkboxes state 
import { useState } from "react";
import { letters } from "./data.js";
import Letter from "./Letter.js";

export default function MailClient() {
  const [selectedId, setSelectedId] = useState([]);

  // TODO: allow multiple selection
  const selectedCount = 1;

  function handleToggle(toggledId) {
    // TODO: allow multiple selection
    if (selectedId.includes(toggledId)) {
      setSelectedId(selectedId.filter((item) => item !== toggledId));
    } else {
      console.log("comes here");
      setSelectedId([...selectedId, toggledId]);
    }
  }

  console.log(selectedId);

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: allow multiple selection
              letter.id === selectedId
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>You selected {selectedCount} letters</b>
        </p>
      </ul>
    </>
  );
}


// Sync inputs 
import { useState } from 'react';

export default function SyncedInputs() {
  return (
    <>
      <Input label="First input" />
      <Input label="Second input" />
    </>
  );
}

function Input({ label }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <label>
      {label}
      {' '}
      <input
        value={text}
        onChange={handleChange}
      />
    </label>
  );
}

// filter a list 
import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  return (
    <>
      <SearchBar />
      <hr />
      <List items={foods} />
    </>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={handleChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody>
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Challenge - 5 
// Show and hide hint without resetting state 
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
 
  return (
    <div>
      {showHint && (
      <div>
        <p><i>Hint: Your favorite city?</i></p>
      </div>
      )}
      <Form />
      <button onClick={() => {
        setShowHint(!showHint);
      }}>{!showHint ? 'Show hint' : 'Hide Hint'}</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}

// Challenge - 6
// swap vals keeping state intact 
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );

  return (
    <>
    {reverse ? 
      <>
        <Field label="Last Name" name={lastName} setName={setLastName} />
        <Field label="First Name"  name={firstName} setName={setFirstName} />
      </> : <>
      <Field label="First Name" name={firstName} setName={setFirstName}/>
        <Field label="Last Name" name={lastName} setName={setLastName} />
      </>
    }
    {checkbox}
    </>
  )
}

function Field({ label, name, setName}) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={name}
        placeholder={label}
        onChange={e => setName(e.target.value)}
      />
    </label>
  );
}

// Challenge - 7
// reducers work 

export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                // TODO: dispatch changed_selection
                dispatch({type: 'changed_selection', contactId: contact.id})
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          // TODO: dispatch edited_message
          // (Read the input value from e.target.value)
          dispatch({type: 'edited_message', message: e.target.value})
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}


// Challenge - 8
// modify the useReducer hook 
export const initialState = {
  selectedId: 0,
  contactID_message: {},
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case "changed_selection": {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case "edited_message": {
      return {
        ...state,
        message: action.message,
        contactID_message: {
          ...state.contactID_message,
          [action.contactID]: action.message,
        },
      };
    }
    case "sent_message": {
      return {
        ...state,
        message: "",
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
