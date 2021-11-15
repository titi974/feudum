import PathURL from "./PathURL";

export abstract class RedirectOtherSee {
    redirect(root: PathURL, url: { uri?: string[]; query?: string[] }) {
        let location = `/${PathURL.API}/${root}`
        if (Array.isArray(url.uri)) {
            location += `/${url.uri.join('/')}`
        }
        if (Array.isArray(url.query)) {
            location += `?${url.query.join('&')}`
        }
        return {url: location}
    }

    stringParam(param: string): string {
        return param.replace(':', '')
    }
}
