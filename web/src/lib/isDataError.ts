import { ErrorModel } from "../../openapi/requests";

export const isDataError = <T extends object>(
	data: T | ErrorModel
): data is ErrorModel => {
	return (
		"$schema" in data &&
		typeof data["$schema"] === "string" &&
		data["$schema"].endsWith("http://localhost:8080/schemas/ErrorModel.json")
	);
};
