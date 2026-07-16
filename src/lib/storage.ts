import { SavedContract } from "./types";

const DB_NAME = "MicroContractGeneratorDB";
const STORE_NAME = "contracts";
const DB_VERSION = 1;

export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("IndexedDB is only available in the browser"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

export async function saveContract(contract: SavedContract): Promise<void> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(contract);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("IndexedDB save failed, falling back to localStorage", error);
    if (typeof window !== "undefined") {
      try {
        const contracts = JSON.parse(localStorage.getItem(STORE_NAME) || "[]");
        const index = contracts.findIndex((c: any) => c.id === contract.id);
        if (index > -1) {
          contracts[index] = contract;
        } else {
          contracts.push(contract);
        }
        localStorage.setItem(STORE_NAME, JSON.stringify(contracts));
      } catch (lsError) {
        console.error("localStorage fallback failed", lsError);
      }
    }
  }
}

export async function getContracts(): Promise<SavedContract[]> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("IndexedDB fetch failed, falling back to localStorage", error);
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem(STORE_NAME) || "[]");
      } catch {
        return [];
      }
    }
    return [];
  }
}

export async function deleteContract(id: string): Promise<void> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("IndexedDB delete failed, falling back to localStorage", error);
    if (typeof window !== "undefined") {
      try {
        const contracts = JSON.parse(localStorage.getItem(STORE_NAME) || "[]");
        const filtered = contracts.filter((c: any) => c.id !== id);
        localStorage.setItem(STORE_NAME, JSON.stringify(filtered));
      } catch (lsError) {
        console.error("localStorage delete fallback failed", lsError);
      }
    }
  }
}
