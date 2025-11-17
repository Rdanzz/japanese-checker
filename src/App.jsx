import { useState } from "react";
import { checkJapanese } from "./utils/gemini";
import { toHiragana } from "wanakana";

function App() {
  const [indo, setIndo] = useState("");
  const [japan, setJapan] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTransliterate = () => {
    if (!japan.trim()) return;
    setJapan(toHiragana(japan));
  };

  const handleCheck = async () => {
    if (!indo.trim() || !japan.trim()) return;

    setLoading(true);
    try {
      const data = await checkJapanese(indo, japan);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        status: "error",
        penjelasan: "Terjadi kesalahan saat memproses. Coba lagi ya bos.",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#0f0f12] text-gray-200 flex flex-col items-center py-10 px-4 pb-28">

        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-indigo-400 drop-shadow">
            Japanese <br />
            Sentence Checker
          </h1>
          <p className="text-gray-400 mt-1">
            Latihan grammar & partikel Jepang dengan AI
          </p>
        </header>

        <div className="w-full max-w-2xl bg-[#1a1a1e]/70 backdrop-blur-lg shadow-xl border border-white/10 rounded-xl p-6 mb-8">
          <label className="font-medium text-gray-300">Kalimat Indonesia</label>
          <textarea
            value={indo}
            onChange={(e) => setIndo(e.target.value)}
            className="w-full mt-1 mb-4 p-3 bg-[#0f0f12] border border-white/10 rounded-md 
            focus:ring-2 focus:ring-indigo-500 outline-none text-gray-100"
            placeholder="contoh: Saya membeli daging di supermarket"
            rows={3}
          />

          <label className="font-medium text-gray-300">Kalimat Jepang</label>
          <textarea
            value={japan}
            onChange={(e) => setJapan(e.target.value)}
            className="w-full mt-1 p-3 bg-[#0f0f12] border border-white/10 rounded-md 
            focus:ring-2 focus:ring-indigo-500 outline-none text-gray-100 mb-3"
            placeholder="contoh: スーパーで 肉 を 買います。"
            rows={3}
          />

          <div className="flex justify-end mb-3">
            <button
              onClick={handleTransliterate}
              className="px-3 py-2 text-sm bg-[#2a2a30] hover:bg-[#32323a] 
              text-gray-300 rounded-md border border-white/10 transition"
            >
              Hiragana
            </button>
          </div>

          <button
            onClick={handleCheck}
            disabled={loading}
            className="w-full py-3 bg-[#434349] text-white font-semibold rounded-lg 
            hover:bg-[#32323a] transition shadow-md disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </div>

        {result && (
          <div className="w-full max-w-2xl bg-[#1a1a1e]/70 backdrop-blur-lg shadow-xl 
          border border-white/10 rounded-xl p-6">

            <span
              className={`inline-block px-3 py-1 text-sm text-white rounded-full mb-4 shadow-md
                ${
                  result.status === "benar"
                    ? "bg-green-600"
                    : result.status === "salah"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
            >
              {result.status?.toUpperCase()}
            </span>

            <p className="text-gray-300 mb-3">{result.penjelasan}</p>

            {result.koreksi && (
              <div className="bg-[#0f0f12] p-3 rounded-md border border-white/10 mb-3">
                <p>
                  <strong className="text-red-400">Koreksi:</strong>{" "}
                  {result.koreksi}
                </p>
              </div>
            )}

            {result.natural && (
              <div className="bg-[#0f0f12] p-3 rounded-md border border-white/10">
                <p>
                  <strong className="text-indigo-400">Natural:</strong>{" "}
                  {result.natural}
                </p>
              </div>
            )}
          </div>
        )}
        <footer className="fixed bottom-0 left-0 w-full bg-[#0f0f12]/80 backdrop-blur-md border-t border-white/10 py-3 text-center text-gray-400 text-sm">
          <p className="opacity-70">
            zidhanraffly_ / powered by Gemini AI
          </p>
         <p className="opacity-40 text-xs">
          Japanese Sentence Checker &copy; {new Date().getFullYear()}
        </p>
        </footer>
      </div>
    </>
  );
}

export default App;
