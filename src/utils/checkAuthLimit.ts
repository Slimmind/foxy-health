// utils/userUtils.ts
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Function to get user count from Firestore
export const checkAuthLimit = async (): Promise<number> => {
	const db = getFirestore();
	const usersCollection = collection(db, 'users');

	try {
		const usersSnapshot = await getDocs(usersCollection);
		return usersSnapshot.size; // Returns the number of users
	} catch (error) {
		console.error('Error fetching user count:', error);
		throw error; // Re-throw the error to handle it later if needed
	}
};
