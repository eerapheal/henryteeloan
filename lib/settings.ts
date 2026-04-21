import clientPromise from "./mongodb";
import { SystemSettings, defaultSettings } from "./settings-constants";

export async function getSettings(): Promise<SystemSettings> {
  try {
    const client = await clientPromise;
    const db = client.db("henrytee_loans");
    
    // There will be only one settings document
    const settingsDoc = await db.collection("settings").findOne({});
    
    if (settingsDoc) {
      return {
        interestRate: settingsDoc.interestRate ?? defaultSettings.interestRate,
        maxLoanAmount: settingsDoc.maxLoanAmount ?? defaultSettings.maxLoanAmount,
        adminEmail: settingsDoc.adminEmail ?? defaultSettings.adminEmail,
        supportPhone1: settingsDoc.supportPhone1 ?? defaultSettings.supportPhone1,
        supportPhone2: settingsDoc.supportPhone2 ?? defaultSettings.supportPhone2,
      };
    }
    
    // If no settings exist yet, return defaults
    return defaultSettings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return defaultSettings;
  }
}
