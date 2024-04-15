export async function calculateQuantityByScript(script: string, quantity: string): Promise<string> {
  try {
    const qty = parseInt(quantity, 10);
    const string = script.toLocaleLowerCase();

    if (string.includes("banknifty")) {
      return (qty * 15).toString();
    } else if (string.includes("nifty")) {
      return (qty * 50).toString();
    } else {
      return "";
    }
  } catch (error) {
    throw error;
  }
}
