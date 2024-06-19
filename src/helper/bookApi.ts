import axios from 'axios';

const makeSequentialApiCall = async (apiUrl: string) => {
    const startTime: Date = new Date();
    let callsMade: number = 0;

    while (true) {
        try {
            const response = await axios.get(apiUrl);

            if (response.status !== 200) {
                console.log('Error in API call:', response.statusText);
                callsMade++;
                if (callsMade >= 5 || (new Date().getTime() - startTime.getTime() >= 300000)) {
                    break;
                }
            } else {
                return response.data;
            }
        } catch (error) {
            console.error('Error:', error);
            callsMade++;
            if (callsMade >= 5 || (new Date().getTime() - startTime.getTime() >= 300000)) {
                break;
            }
        }
    }
};

export const getAllBooks = async () => {
    const apiUrl: string = 'https://gutendex.com/books/';
    const books:object = await makeSequentialApiCall(apiUrl);
    return books;
};

export const searchBooksByTitle = async (title: string) => {
    const apiUrl = `https://gutendex.com/books/?search=${encodeURIComponent(title)}`;
    const books:object = await makeSequentialApiCall(apiUrl);
    return books;
};

export const searchBooksByAuthor = async (author: string) => {
    const apiUrl = `https://gutendex.com/books/?author=${encodeURIComponent(author)}`;
    const books:object = await makeSequentialApiCall(apiUrl);
    return books;
};

export const searchBooksByGenre = async (genre: string) => {
    const apiUrl = `https://gutendex.com/books/?genre=${encodeURIComponent(genre)}`;
    const books = await makeSequentialApiCall(apiUrl);
    return books;
};
