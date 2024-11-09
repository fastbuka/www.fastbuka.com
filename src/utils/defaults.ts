// sets a default avatar if none is provided
export function getDefaultAvatar(avatar: string | undefined): string {
    //using optional chaining to avoid throwing an error if avatar is null or undefined
  return avatar?.trim() ? avatar : "/images/profile.png";
}

// sets a fallback name if first_name is not provided or an empty string
export function getDefaultFirstName(first_name: string | undefined): string {
    return first_name?.trim() ? first_name : "Guest user";
}

export function getDefaultAddress(address: string | undefined): string {
    return address?.trim() ? address : "No address";
}