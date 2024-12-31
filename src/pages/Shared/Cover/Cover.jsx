import { Parallax } from "react-parallax";
const Cover = ({ img,title}) => {
  return (
    <Parallax
    className="absolute mb-20"
      bgImage={img}
      bgImageAlt="Cover image"
      strength={0} // Set the parallax strength for a better effect
      blur={{ min: -15, max: 15 }} // Optional: Add some blur effec
    >
      <div className="hero min-h-[700px]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl bg-slate-800 p-8 opacity-50 rounded">
            <h1 className="mb-5 text-5xl font-bold text-white">{title}</h1>
            <p className="mb-5 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            </p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
