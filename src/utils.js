const schemes = {
    users: [ "username", "email", "password" ],
    posts: [ "title", "description", "code" ],
    comments: [ "content" ],
    ratings: ["rating", "user_id", "post_id"]
}

// checks the entry argument against the scheme argument to make sure that all fields have been submitted
// if any fields are missing, that field name is pushed into an array and returned
function verifyEntry(entry, scheme) {
  const requirements = schemes[scheme];

  const missingFields = requirements.reduce((acc, property) => {
    if (!entry[property]) {
      acc.push(property);
    }

    return acc;
  }, [] );
  
  if (missingFields.length > 0) {
    throw  "Missing: " + missingFields.join(", ")
  }
}

module.exports = verifyEntry;

