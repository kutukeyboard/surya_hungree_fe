import { useState, useEffect, useCallback } from "react";
import { set, get } from "idb-keyval";
export function usePersisted(keyToPersistWith, defaultState) {
	const [state, setState] = useState(undefined);
	useEffect(() => {
		get(keyToPersistWith).then((retrievedState) =>
			setState(
				retrievedState !== null && retrievedState !== void 0
					? retrievedState
					: defaultState
			)
		);
	}, [keyToPersistWith, setState, defaultState]);
	const setPersistedValue = useCallback(
		(newValue) => {
			setState(newValue);
			set(keyToPersistWith, newValue);
		},
		[keyToPersistWith, setState]
	);
	return [state, setPersistedValue];
}
