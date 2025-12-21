export function generateOrderId(prefix = "ORD") {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    // 8 chars base36 random
    const rand = Math.random().toString(36).slice(2, 10).toUpperCase();

    return `${prefix}-${y}${m}${d}-${rand}`;
}
