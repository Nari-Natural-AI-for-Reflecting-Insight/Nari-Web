type DiaryQnaProps = {
  question: string;
  answer: string;
};

const DiaryQna = ({ question, answer }: DiaryQnaProps) => {
  return (
    <div className="flex flex-col gap-4 text-white px-7 py-4 font-kbo">
      <div className="flex items-center gap-3">
        <img src="public/icons/flower.svg" className="w-8 h-auto" />
        <p className="text-lg">{question}</p>
      </div>
      <p className="text-base">{answer}</p>
      <hr className="border text-[#6F71ED]" />
    </div>
  );
};

export default DiaryQna;
