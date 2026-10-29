// My List tab: add, show, finish and delete items.

import { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { MoonItem, useMoonItems } from '../../context/MoonItemContext';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

type MoonFilterName = 'all' | 'open' | 'finished';

const moonFilters: { name: MoonFilterName; label: string }[] = [
  { name: 'all', label: 'All' },
  { name: 'open', label: 'To do' },
  { name: 'finished', label: 'Finished' },
];

export default function MyListScreen() {
  const {
    items,
    itemTotal,
    leftCount,
    finishedCount,
    finishedPercent,
    addItem,
    flipItem,
    dropItem,
    dropFinished,
  } = useMoonItems();

  // Local state: only this screen needs these two
  const [draft, setDraft] = useState('');
  const [chosenFilter, setChosenFilter] = useState<MoonFilterName>('all');

  const filterCounts = { all: itemTotal, open: leftCount, finished: finishedCount };

  const listToShow = items.filter((item) => {
    if (chosenFilter === 'open') return !item.checked;
    if (chosenFilter === 'finished') return item.checked;
    return true;
  });

  const onPressAdd = () => {
    addItem(draft);
    setDraft('');
  };

  // One row of the list
  const renderItem = ({ item }: { item: MoonItem }) => (
    <View className="mb-3 flex-row items-center rounded-3xl bg-white px-4 py-3 shadow-sm">
      <Pressable onPress={() => flipItem(item.itemId)} className="flex-1 flex-row items-center">
        <View
          className={`mr-3 h-9 w-9 items-center justify-center rounded-full ${
            item.checked ? 'bg-moon-rose' : 'bg-moon-blush'
          }`}
        >
          <Text className="text-base text-white">{item.checked ? '♥' : ''}</Text>
        </View>

        <Text
          className={`flex-1 text-base md:text-lg ${
            item.checked ? 'text-moon-mauve line-through' : 'font-semibold text-moon-plum'
          }`}
        >
          {item.text}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => dropItem(item.itemId)}
        hitSlop={8}
        className="ml-2 h-9 w-9 items-center justify-center rounded-full bg-moon-blush active:bg-moon-petal"
      >
        <Text className="text-sm font-bold text-moon-rose-dark">✕</Text>
      </Pressable>
    </View>
  );

  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-moon-cream">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="w-full max-w-xl flex-1 self-center px-5 pt-5">
          {/* Header */}
          <View className="flex-row items-center">
            <View className="mr-3 h-14 w-14 items-center justify-center rounded-full bg-moon-petal">
              <Text className="text-3xl">🌙</Text>
            </View>
            <View className="flex-1">
              <Text className="text-3xl font-extrabold text-moon-plum md:text-4xl">MoonList</Text>
              <Text className="text-moon-mauve">Little steps, big dreams</Text>
            </View>
          </View>

          {/* Big counter card */}
          <View className="mt-5 flex-row items-center rounded-3xl bg-moon-rose p-5">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-moon-blush">Items left</Text>
              <Text className="text-5xl font-extrabold text-white">{leftCount}</Text>
            </View>
            <View className="items-center rounded-2xl bg-white/20 px-5 py-3">
              <Text className="text-2xl font-extrabold text-white">{finishedPercent}%</Text>
              <Text className="text-xs text-moon-blush">finished</Text>
            </View>
          </View>

          {/* Add item */}
          <View className="mt-4 flex-row items-center rounded-full bg-white py-1 pl-5 pr-1 shadow-sm">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={onPressAdd}
              placeholder="Write something nice to do..."
              placeholderTextColorClassName="accent-moon-mauve"
              returnKeyType="done"
              className="h-12 flex-1 py-0 text-[16px] text-moon-plum"
            />
            <Pressable
              onPress={onPressAdd}
              className="rounded-full bg-moon-rose-dark px-6 py-3 active:opacity-70"
            >
              <Text className="font-bold text-white">Add</Text>
            </Pressable>
          </View>

          {/* Filter chips */}
          <View className="mt-4 flex-row gap-2">
            {moonFilters.map((filter) => {
              const isOn = chosenFilter === filter.name;
              return (
                <Pressable
                  key={filter.name}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setChosenFilter(filter.name);
                  }}
                  className={`rounded-full px-4 py-2 ${isOn ? 'bg-moon-plum' : 'bg-moon-blush'}`}
                >
                  <Text
                    className={`text-sm font-semibold ${isOn ? 'text-white' : 'text-moon-plum'}`}
                  >
                    {filter.label} · {filterCounts[filter.name]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* List */}
          <FlatList
            data={listToShow}
            keyExtractor={(item) => item.itemId}
            renderItem={renderItem}
            className="mt-4 flex-1"
            contentContainerClassName="pb-8"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            onScrollBeginDrag={Keyboard.dismiss}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="mt-10 items-center">
                <Text className="text-5xl">{chosenFilter === 'finished' ? '🌷' : '✨'}</Text>
                <Text className="mt-3 text-lg font-bold text-moon-plum">
                  {chosenFilter === 'finished' ? 'Nothing finished yet' : 'Your list is empty'}
                </Text>
                <Text className="mt-1 text-moon-mauve">
                  {chosenFilter === 'finished'
                    ? 'Tap an item to finish it.'
                    : 'Add something to get started.'}
                </Text>
              </View>
            }
            ListFooterComponent={
              finishedCount > 0 ? (
                <Pressable
                  onPress={dropFinished}
                  className="mt-1 items-center rounded-full border border-moon-petal py-3 active:bg-moon-blush"
                >
                  <Text className="font-semibold text-moon-rose-dark">
                    Clear {finishedCount} finished
                  </Text>
                </Pressable>
              ) : undefined
            }
          />
        </View>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
