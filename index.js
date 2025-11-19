const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  console.log("\n=== Add New To-Do ===");

  // 1. Prompt user
  const text = prompt("Enter your To-Do: ").trim();

  // 2. Validasi input
  if (!text) {
    console.log("To-Do cannot be empty!");
    return;
  }

  // 3. Buat object to-do
  const newTodo = {
    id: generateUniqueId(),
    text: text,
    isCompleted: false,
  };

  // Tambahkan ke array todos
  todos.push(newTodo);

  // 5. Feedback
  console.log(`To-Do added:"${text}"`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai
  console.log("\n=== Mark To-DO Completed ===");

  // 1. Kalau to-do kosong
  if (todos.length === 0) {
    console.log("No to-dos available to mark");
    return;
  }

  // 2. Tampilkan daftar to-do
  listTodos();

  // 3. Minta nomor to-do
  const input = prompt(
    "Enter the number of the to-do to mark as completed: "
  ).trim();
  const index = Number(input) - 1;

  // 4. Validasi input
  if (Number.isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid to-do number");
    return;
  }

  const todo = todos[index];

  // 5. Jika sudah completed sebelumnya
  if (todo.isCompleted) {
    console.log("This to-do is already completed");
    return;
  }

  // 6. Tandai sebagai selesai
  todo.isCompleted = true;

  // 7. Feedback
  console.log(`To-do marked as completed: "${todo.text}"`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  console.log("\n=== Delete To-Do ===");

  // Kalau tidak ada to-do
  if (todos.length === 0) {
    console.log("No to-dos available to delete");
    return;
  }

  // 1. Tampilkan list
  listTodos();

  // 2. Input nomor to-do
  const input = prompt("Enter the number of the to-do to delete: ").trim();
  const index = Number(input) - 1;

  // 3. Validasi input
  if (Number.isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid to-do number");
    return;
  }

  // 4. Hapus to-do
  const removedTodo = todos.splice(index, 1)[0];

  // 5. Feedback
  console.log(`Deleted to-do: "${removedTodo.text}"`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar
  console.log("\n=== To-Do List ===");

  // 2. Jika belum ada to-do
  if (todos.length === 0) {
    console.log("No to-dos to display");
    return;
  }

  // 1. Tampilkan semua to-do
  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? "[DONE] |" : "[ACTIVE] |";
    console.log(`${index + 1}. ${status} ${todo.text} (id: ${todo.id})`);
  });

  // 5. Garis penutup daftar
  console.log("----- End of List -----");
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  console.log("\n=== Interactive To-Do List ===");
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    console.log("\nMenu");
    console.log("1. Add To-Do");
    console.log("2. List To-Dos");
    console.log("3. Mark To-Do Completed");
    console.log("4. Delete To-Do");
    console.log("5. Exit");

    const choice = prompt("Choose an option (1-5):").trim();

    switch (choice) {
      case "1":
        addTodo();
        break;
      case "2":
        listTodos();
        break;
      case "3":
        markTodoCompleted();
        break;
      case "4":
        deleteTodo();
        break;
      case "5":
        console.log("Goodbye!");
        running = false;
        break;
      default:
        console.log("Invalid option, please choose 1-5");
        break;
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
