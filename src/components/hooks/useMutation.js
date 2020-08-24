import { useCallback } from "react";
import { mutate } from "swr";

export const mutationTypes = {
  CONVERSATIONS: 'CONVERSATIONS',
  MESSAGES: 'MESSAGES'
}

function useMutation(mutationFn = f => f, options = {}) {
  const mutationCallback = useCallback(
    async (key, _payload) => {
      const {
        onSuccess = () => {},
        onMutate = () => {},
        onError = () => {},
        currentData = [],
        type,
        replaceUsername,
      } = options;
      onMutate(key, _payload);
      try {
        const payload = await mutationFn(_payload);
        
        if (type === mutationTypes.CONVERSATIONS) {
          const { message_id, body, created_at } = payload;
          
          const updatedData = [{
            other_username: replaceUsername,
            message_id,
            body,
            created_at,
            avatar_url: currentData.find( convo => convo.other_username === replaceUsername).avatar_url
          }, ...currentData.filter(convo => convo.other_username !== replaceUsername)]

          await mutate(key, updatedData, false);
        }
        
        else if (type === mutationTypes.MESSAGES) {
          await mutate(key, [...currentData, payload], false);
        }
        onSuccess(key, payload);
      } catch (e) {
        onError(e);
      }
    },
    [mutationFn, options]
  );
  return mutationCallback;
}

export default useMutation;