/* eslint-disable camelcase */
exports.up = (pgm) => {
    // create organizations table
    pgm.createTable('organizations', {
        id: 'id',
        name: { type: 'varchar(100)', notNull: true },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('organizations', 'name')

    // create comments table
    pgm.createTable('comments', {
        id: 'id',
        comment: { type: 'text', notNull: true },
        deleted: {
            type: 'integer',
            default: 0,
        },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
        updatedAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
    })

    // create organization_comments table
    pgm.createTable('organization_comments', {
        id: 'id',
        organizationId: {
          type: 'integer',
          notNull: true,
          references: '"organizations"',
          onDelete: 'cascade',
        },
        commentId: {
            type: 'integer',
            notNull: true,
            references: '"comments"',
            referencesConstraintName: "comments.commentId",
            onDelete: 'cascade',
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })

    // create members table
    pgm.createTable('members', {
        id: 'id',
        username: {
            type: 'varchar(100)',
            notNull: true,
        },
        password: {
            type: 'varchar(100)',
            notNull: true,
        },
        avatarUrl: { type: 'text', notNull: true },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
    })

    // create member_followers table
    pgm.createTable('member_followers', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: true,
            references: '"members"',
            onDelete: 'cascade',
        },
        followerId: {
            type: 'integer',
            notNull: true,
            references: '"members"',
            onDelete: 'cascade',
        },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('member_followers', ['userId', 'followerId'], { unique: true })

    // create organization_members table
    pgm.createTable('organization_members', {
        id: 'id',
        organizationId: {
          type: 'integer',
          notNull: true,
          references: '"organizations"',
          onDelete: 'cascade',
        },
        memberId: {
            type: 'integer',
            notNull: true,
            references: '"members"',
            onDelete: 'cascade',
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })

    // initial data for organizations
    pgm.sql(`INSERT INTO organizations ("name") VALUES ('Xendit'), ('Google'), ('Facebook');`)

    // initial data for members table
    pgm.sql(`
      INSERT INTO members ("username", "password", "avatarUrl")
      VALUES
      ('xenditmember1', '${Math.random().toString(36).substr(2, 10)}', 'https://www.w3schools.com/howto/img_avatar.png'),
      ('xenditmember2', '${Math.random().toString(36).substr(2, 10)}', 'https://www.w3schools.com/howto/img_avatar2.png'),
      ('xenditmember3', '${Math.random().toString(36).substr(2, 10)}', 'https://www.w3schools.com/howto/img_avatar3.png'),
      ('xenditmember4', '${Math.random().toString(36).substr(2, 10)}', 'https://www.w3schools.com/howto/img_avatar4.png'),
      ('xenditmember5', '${Math.random().toString(36).substr(2, 10)}', 'https://www.w3schools.com/howto/img_avatar5.png');
    `);

    // initial data for organization_members table
    pgm.sql(`
      INSERT INTO organization_members ("organizationId", "memberId")
      VALUES
      ('1', '1'),
      ('1', '2'),
      ('1', '3'),
      ('1', '4'),
      ('1', '5');
    `);

    // initial data for member_followers table
    pgm.sql(`
      INSERT INTO member_followers ("userId", "followerId")
      VALUES
      ('1', '2'),
      ('1', '3'),
      ('1', '4'),
      ('1', '5'),
      ('2', '1'),
      ('2', '3'),
      ('3', '4'),
      ('4', '1'),
      ('4', '2'),
      ('4', '5'),
      ('5', '2'),
      ('5', '3');
    `);
}
