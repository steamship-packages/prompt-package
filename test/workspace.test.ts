
// @ts-ignore
import {steamshipClient} from '@/helper';
import {Workspace} from '../src/lib/workspace'

describe("Space", () => {
  test('it should have a default space', async () => {
    const steamship = steamshipClient();
    const resp = await Workspace.get(steamship)
    expect(resp.output).not.toBeFalsy()
    expect(resp.output?.handle).toEqual('default')
  }, 10000);

  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();
    const def = (await Workspace.get(steamship)).output!

    const space1l = (await Workspace.list(steamship)).output!
    const starting_spaces = space1l.workspaces.length

    const space1 = (await Workspace.create(steamship)).output!
    expect(space1.handle).not.toBeUndefined()
    expect(space1.id).not.toBe(def.id)

    const space2 = (await Workspace.create(steamship, {})).output!
    expect(space2.id).not.toBe(space1.id)

    // Can get them!
    const space1a = (await Workspace.get(steamship, {id: space1.id})).output!
    expect(space1a.id).toBe(space1.id)
    expect(space1a.handle).toBe(space1.handle)

    // Can list them
    const space2l = (await Workspace.list(steamship)).output!
    expect(space2l.workspaces.length).toBe(starting_spaces + 2)

    await space1.delete()
    await space2.delete()


    // They should no longer be there.
    expect(
      Workspace.get(steamship, {id: space1.id})
    ).rejects.toThrow()
  }, 10000);

})
