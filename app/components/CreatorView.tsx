interface Creator {
  name: string;
  avatarUrl: string;
  publishDate: string;
}

export default function CreatorView({ creator }: { creator: Creator }) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col items-center text-center">
                <img src={creator.avatarUrl} alt={`${creator.name}'s avatar`} className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-100" onError={(e) => { e.currentTarget.src = 'https://placehold.co/96x96/e0e7ff/4338ca?text=User'; }} />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">{creator.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">Creator of this post. Exploring the intersection of code and creativity.</p>
            </div>
            <button className="w-full mt-6 bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-all duration-200">Follow</button>
            <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-gray-700">Published</h3>
                <p className="text-sm text-gray-500">{creator.publishDate}</p>
            </div>
        </div>
    )
}