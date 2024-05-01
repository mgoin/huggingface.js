import { HfInference } from "npm:@huggingface/inference@*";
import { whoAmI, listFiles } from "npm:@huggingface/hub@*";

const token = Deno.env.get("HF_TOKEN");

if (!token) {
	console.error("Please set the HF_TOKEN environment variable.");
	Deno.exit(1);
}

const info = await whoAmI({ credentials: { accessToken: "hf_hub.js" }, hubUrl: "https://hub-ci.huggingface.co" });
console.log(info);

for await (const file of listFiles({ credentials: { accessToken: "hf_hub.js" }, repo: "gpt2" })) {
	console.log(file);
}

const hf = new HfInference(token);

const tokenInfo = await whoAmI({ credentials: { accessToken: token } });
console.log(tokenInfo);

const sum = await hf.summarization({
	model: "google/pegasus-xsum",
	inputs:
		"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930.",
	parameters: {
		max_length: 100,
	},
});

console.log(sum);
