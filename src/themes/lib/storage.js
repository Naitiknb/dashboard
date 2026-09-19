export function getAll(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

export function getById(key, id) {
  const data = getAll(key);

  return data.find((item) => item.id === id);
}

export function create(key, item) {
  const data = getAll(key);

  const newItem = {
    ...item,
    id: Date.now(),
  };

  data.push(newItem);

  localStorage.setItem(key, JSON.stringify(data));

  return newItem;
}

export function update(key, id, updates) {
  const data = getAll(key);

  const updatedData = data.map((item) =>
    item.id === id
      ? { ...item, ...updates }
      : item
  );

  localStorage.setItem(key, JSON.stringify(updatedData));

  return updatedData.find((item) => item.id === id);
}

export function remove(key, id) {
  const data = getAll(key);

  const updatedData = data.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(key, JSON.stringify(updatedData));
}