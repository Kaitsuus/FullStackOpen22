import { useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries';
import { BOOK_ADDED } from '../graphql/subscriptions';
import { addOrUpdateCachedQueryArrayItem } from '../graphql/utils';

const updateCachedQueries = (cache, book) => {
  addOrUpdateCachedQueryArrayItem(
    cache,
    { query: ALL_AUTHORS },
    book.author
  );

  const bookQueries = [{ query: ALL_BOOKS }].concat(
    book.genres.map((genre) => ({
      query: ALL_BOOKS,
      variables: { genre },
    }))
  );

  bookQueries.forEach((query) =>
    addOrUpdateCachedQueryArrayItem(cache, query, book)
  );
};

const useBookAddedSubscription = () => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({
      client: { cache },
      subscriptionData: {
        data: { bookAdded: book },
      },
    }) => {
      alert(
        `Book "${book.title}" by "${book.author.name}" was added to the library.`
      );

      updateCachedQueries(cache, book);
    },
  });
};

export default useBookAddedSubscription;