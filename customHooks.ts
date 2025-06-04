// Practice a few custom hooks in react 
import { useState } from "react";

type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};


// useBoolean
export default function useBoolean(initialValue?: boolean): UseBooleanReturn {
  const [value, setValue] = useState(initialValue || false);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return {
    value,
    setFalse,
    setTrue,
  };
}



// useCount 
import { Dispatch, SetStateAction, useState } from 'react';

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function useCounter(initialValue?: number): UseCounterReturn {
   const [count , setCount] = useState(initialValue || 0); 

   const increment = () => setCount(prev => prev + 1); 
   const decrement = () => setCount(prev => prev - 1); 

   const reset = () => setCount(initialValue || 0); 

   return {
     count , increment, decrement, reset, setCount
   }

}


// optimized useBoolean 
import { useCallback, useState } from "react";

type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

export default function useBoolean(initialValue?: boolean): UseBooleanReturn {
   const [value, setValue] = useState(initialValue || false);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return {
    value,
    setFalse,
    setTrue,
  };
}


// useClickAnywhere hook 
import { useEffect } from "react";

export default function useClickAnywhere(handler: (event: MouseEvent) => void) {
   useEffect(() => {
      window.addEventListener('click', handler);

      return () => {
        window.removeEventListener('click', handler); 
      }
   }, []); 

   
}

// useCounter with optimized callbacks
import { useCallback, useState } from 'react';

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function useCounter(initialValue?: number): UseCounterReturn {
  const [count , setCount] = useState(initialValue || 0); 

   const increment = useCallback(() => setCount(prev => prev + 1), []); 
   const decrement = useCallback(() => setCount(prev => prev - 1), []); 

   const reset = useCallback(() => setCount(initialValue || 0), []); 

   return {
     count , increment, decrement, reset, setCount
   }
}

// useCycle hook 
// memoised 
// finding the next value in a cyclic manner by getting the remainder of the index 
import { useState, useCallback, useRef } from "react";

export default function useCycle<T>(...args: T[]) {
    const indexRef = useRef(0);
    const arrLength = args.length; 

    const [mode, setMode] = useState(args[0]);

    const cycle = useCallback(() => {
        // make it cyclic 
        // remainder by dividing with the 
        // array length will make sure the cyclic val is reached 
        indexRef.current = (indexRef.current + 1) % arrLength; 
        setMode(args[indexRef.current]);
    } , []); 
    
    return [mode, cycle];
}

// useDefault value hook
export default function useDefault<TStateType>(
  defaultValue: TStateType,
  initialValue: TStateType | (() => TStateType),
) {
  const [user, setUser] = useState(initialValue);

  if (user === null || user === undefined) {
    return [defaultValue, setUser];
  }

  return [user, setUser];
}



