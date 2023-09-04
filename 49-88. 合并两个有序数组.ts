function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  if (!m && !n) return;

  // 正常两组都有数据
  let i = m;
  let p1 = 0;
  let p2 = 0;
  while (p1 < m && p2 < n) {
    nums1[i++] = nums1[p1] <= nums2[p2] ? nums1[p1++] : nums2[p2++];
  }

  while (p1 < m) {
    nums1[i++] = nums1[p1++]
  }

  while (p2 < n) {
    nums1[i++] = nums2[p2++]
  }
  nums1.splice(0, m)
  console.log(nums1)
};

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)
merge([1], 1, [0], 0)
merge([1], 1, [0], 0)